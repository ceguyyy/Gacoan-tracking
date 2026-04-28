import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, fetchLocations, submitTaskActivity } from '../models/api';
import { uploadTaskPhoto } from '../models/storage';

// currentUser is passed in so we can filter tasks to only those assigned to this user.
export function useTaskController(currentUser) {
  const [tasks, setTasks] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);
  const [checklist, setChecklist] = useState({});
  const [taskPhotos, setTaskPhotos] = useState({});
  const [taskNotes, setTaskNotes] = useState({});
  const [uploadingPhoto, setUploadingPhoto] = useState({});
  const [taskStartTime, setTaskStartTime] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const initTaskData = async () => {
      setLoading(true);
      try {
        const [tasksData, locationsData] = await Promise.all([
          fetchTasks(),
          fetchLocations()
        ]);
        setTasks(tasksData);
        setLocations(locationsData);
      } catch (err) {
        setError(err.message || 'Gagal memuat tugas.');
      } finally {
        setLoading(false);
      }
    };
    initTaskData();
  }, []);

  const selectTask = useCallback((task) => {
    setSelectedTask(task);
    // Initialize checklist
    const initial = {};
    if (task?.task) {
      task.task.forEach((_, i) => {
        initial[i] = "";
      });
    }
    setChecklist(initial);
    setTaskPhotos({});
    setTaskNotes({});
    setTaskStartTime(null);
    setSubmitError(null);
  }, []);

  const clearSelectedTask = useCallback(() => {
    setSelectedTask(null);
    setChecklist({});
    setTaskPhotos({});
    setTaskNotes({});
    setUploadingPhoto({});
    setTaskStartTime(null);
  }, []);

  const startTaskExecution = useCallback(() => {
    setTaskStartTime(Date.now());
  }, []);

  const handleStatusChange = useCallback((index, status) => {
    setChecklist((prev) => ({ ...prev, [index]: status }));
  }, []);

  const handleNoteChange = useCallback((index, note) => {
    setTaskNotes((prev) => ({ ...prev, [index]: note }));
  }, []);

  const allChecked = Object.keys(checklist).length > 0 && Object.values(checklist).every(val => val !== "");

  const handlePhotoUpload = useCallback(async (index, file) => {
    if (!file || !selectedTask) return;
    setUploadingPhoto((prev) => ({ ...prev, [index]: true }));
    try {
      const publicUrl = await uploadTaskPhoto(selectedTask.id, index, file);
      setTaskPhotos((prev) => ({ ...prev, [index]: publicUrl }));
    } catch (error) {
      alert(`Gagal upload foto: ${error.message}`);
    } finally {
      setUploadingPhoto((prev) => ({ ...prev, [index]: false }));
    }
  }, [selectedTask]);

  const submitActivity = useCallback(async (userLocation) => {
    if (!allChecked || !selectedTask) return false;
    setSubmitLoading(true);
    setSubmitError(null);

    const payload = {
      task_id: selectedTask.id,
      company_id: selectedTask.company_id,
      assignee: selectedTask.asignee,
      location: selectedTask.location,
      description: selectedTask.description,
      due_date: selectedTask.due_date,
      tasks: selectedTask.task.map((t, i) => ({
        task_name: t.task_name,
        status: checklist[i] || "",
        image: taskPhotos[i] || null,
        note: taskNotes[i] || "",
      })),
      user_location: userLocation,
      start_time: taskStartTime,
      end_time: Date.now(),
      submitted_at: new Date().toISOString(),
      status: "Completed"
    };

    try {
      await submitTaskActivity(payload);
      return true; // success
    } catch (err) {
      setSubmitError(err.message || 'Gagal mengirim data. Coba lagi.');
      return false;
    } finally {
      setSubmitLoading(false);
    }
  }, [allChecked, selectedTask, checklist, taskPhotos]);

  // Filter tasks to only show those assigned to the current user.
  // Falls back to showing all tasks if no user is logged in.
  const assignedTasks = currentUser?.id
    ? tasks.filter((task) => task.asignee?.id === currentUser.id)
    : tasks;

  return {
    tasks: assignedTasks,
    allTasks: tasks, // raw unfiltered list if needed
    locations,
    loading,
    error,
    selectedTask,
    selectTask,
    clearSelectedTask,
    startTaskExecution,
    checklist,
    handleStatusChange,
    allChecked,
    taskPhotos,
    taskNotes,
    handleNoteChange,
    uploadingPhoto,
    handlePhotoUpload,
    submitActivity,
    submitLoading,
    submitError
  };
}
