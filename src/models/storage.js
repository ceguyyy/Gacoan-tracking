import { supabase } from '../supabaseClient';

export const uploadTaskPhoto = async (taskId, itemIndex, file) => {
  if (!file) throw new Error('No file provided');

  const fileExt = file.name.split('.').pop();
  const fileName = `${taskId}-${itemIndex}-${Date.now()}.${fileExt}`;
  const filePath = `tasks/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('task-photos')
    .upload(filePath, file, { cacheControl: '3600', upsert: false });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('task-photos')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
