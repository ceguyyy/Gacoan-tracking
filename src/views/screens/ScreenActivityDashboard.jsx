import React, { useState, useEffect } from 'react';
import { useTheme } from '../styles/ThemeContext';
import { Spinner } from '../components/SharedComponents';

export function ScreenActivityDashboard() {
  const { t } = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Note: Assumes CORS is not blocking this request on the client
        const response = await fetch('https://api-officeless-dev.mekari.com/28086/get_activity_list');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch activity list:', err);
        setError(err.message || 'Gagal memuat data dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', gap: t.spacing4 }}>
        <Spinner size={36} />
        <p style={{ color: t.colorNeutral800, fontSize: t.fontSizeMd }}>Memuat data dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: t.colorDangerLight, color: t.colorDanger, padding: t.spacing4, borderRadius: t.radiusMd, marginTop: t.spacing4 }}>
        <strong>Error: </strong> {error}
      </div>
    );
  }

  // Calculate Metrics
  const totalTasks = data.length;
  
  const tasksByStatus = data.reduce((acc, curr) => {
    const status = curr.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const tasksByAssignee = data.reduce((acc, curr) => {
    const name = curr.asignee?.name || 'Unassigned';
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const totalAssignees = Object.keys(tasksByAssignee).length;

  const cardStyle = {
    backgroundColor: t.colorWhite,
    borderRadius: t.radiusLg,
    padding: t.spacing5,
    boxShadow: t.shadowSm,
    display: 'flex',
    flexDirection: 'column',
    gap: t.spacing3,
  };

  const widgetHeaderStyle = {
    fontSize: t.fontSizeLg,
    fontWeight: t.fontWeightBold,
    color: t.colorNeutral1000,
    marginBottom: t.spacing3,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing5 }}>
      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: t.spacing4 }}>
        
        <div style={{ ...cardStyle, borderLeft: `4px solid ${t.colorBrand}` }}>
          <div style={{ color: t.colorNeutral600, fontSize: t.fontSizeSm, fontWeight: t.fontWeightSemibold }}>Total Tugas</div>
          <div style={{ color: t.colorNeutral1000, fontSize: '32px', fontWeight: t.fontWeightBold }}>{totalTasks}</div>
        </div>

        <div style={{ ...cardStyle, borderLeft: `4px solid ${t.colorWarning}` }}>
          <div style={{ color: t.colorNeutral600, fontSize: t.fontSizeSm, fontWeight: t.fontWeightSemibold }}>In Progress</div>
          <div style={{ color: t.colorNeutral1000, fontSize: '32px', fontWeight: t.fontWeightBold }}>
            {tasksByStatus['In Progress'] || 0}
          </div>
        </div>

        <div style={{ ...cardStyle, borderLeft: `4px solid ${t.colorSuccess}` }}>
          <div style={{ color: t.colorNeutral600, fontSize: t.fontSizeSm, fontWeight: t.fontWeightSemibold }}>Selesai</div>
          <div style={{ color: t.colorNeutral1000, fontSize: '32px', fontWeight: t.fontWeightBold }}>
            {tasksByStatus['Completed'] || tasksByStatus['Selesai'] || 0}
          </div>
        </div>

        <div style={{ ...cardStyle, borderLeft: `4px solid #8b5cf6` }}>
          <div style={{ color: t.colorNeutral600, fontSize: t.fontSizeSm, fontWeight: t.fontWeightSemibold }}>Total Assignee</div>
          <div style={{ color: t.colorNeutral1000, fontSize: '32px', fontWeight: t.fontWeightBold }}>{totalAssignees}</div>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: t.spacing5 }}>
        {/* Status Breakdown */}
        <div style={cardStyle}>
          <h2 style={widgetHeaderStyle}>Status Tugas</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing3 }}>
            {Object.entries(tasksByStatus).map(([status, count]) => {
              const percentage = Math.round((count / totalTasks) * 100) || 0;
              let barColor = t.colorNeutral400;
              if (status === 'In Progress') barColor = t.colorWarning;
              if (status === 'Completed' || status === 'Selesai') barColor = t.colorSuccess;
              if (status === 'Overdue') barColor = t.colorDanger;
              if (status === 'Upcoming') barColor = t.colorBrand;

              return (
                <div key={status}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: t.fontSizeSm, color: t.colorNeutral800 }}>
                    <span>{status}</span>
                    <span style={{ fontWeight: t.fontWeightSemibold }}>{count} ({percentage}%)</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: t.colorNeutral200, height: '8px', borderRadius: t.radiusFull, overflow: 'hidden' }}>
                    <div style={{ width: `${percentage}%`, backgroundColor: barColor, height: '100%', borderRadius: t.radiusFull }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Assignees */}
        <div style={cardStyle}>
          <h2 style={widgetHeaderStyle}>Penugasan</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing2 }}>
            {Object.entries(tasksByAssignee)
              .sort((a, b) => b[1] - a[1]) // Sort descending
              .slice(0, 5) // Top 5
              .map(([name, count]) => (
                <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${t.spacing2} 0`, borderBottom: `1px solid ${t.colorNeutral200}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing2 }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: t.radiusFull, backgroundColor: t.colorBrandLight, color: t.colorBrand, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontSize: t.fontSizeSm, color: t.colorNeutral900, fontWeight: t.fontWeightMedium }}>{name}</span>
                  </div>
                  <span style={{ fontSize: t.fontSizeSm, color: t.colorNeutral600, fontWeight: t.fontWeightSemibold }}>{count} tugas</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div style={cardStyle}>
        <h2 style={widgetHeaderStyle}>Daftar Tugas Terbaru</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.colorNeutral300}`, color: t.colorNeutral600, fontSize: t.fontSizeSm }}>
                <th style={{ padding: `${t.spacing3} ${t.spacing2}`, fontWeight: t.fontWeightSemibold }}>Aktivitas</th>
                <th style={{ padding: `${t.spacing3} ${t.spacing2}`, fontWeight: t.fontWeightSemibold }}>Assignee</th>
                <th style={{ padding: `${t.spacing3} ${t.spacing2}`, fontWeight: t.fontWeightSemibold }}>Lokasi</th>
                <th style={{ padding: `${t.spacing3} ${t.spacing2}`, fontWeight: t.fontWeightSemibold }}>Tenggat Waktu</th>
                <th style={{ padding: `${t.spacing3} ${t.spacing2}`, fontWeight: t.fontWeightSemibold }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((item, index) => {
                const date = new Date(item.due_date);
                const dateString = isNaN(date) ? '-' : date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                
                let statusBg = t.colorNeutral100;
                let statusColor = t.colorNeutral800;
                
                if (item.status === 'In Progress') {
                  statusBg = t.colorWarningLight || '#fef08a';
                  statusColor = t.colorWarning || '#854d0e';
                } else if (item.status === 'Completed' || item.status === 'Selesai') {
                  statusBg = t.colorSuccessLight || '#bbf7d0';
                  statusColor = t.colorSuccess || '#166534';
                }

                return (
                  <tr key={item.id || index} style={{ borderBottom: `1px solid ${t.colorNeutral200}` }}>
                    <td style={{ padding: `${t.spacing3} ${t.spacing2}`, fontSize: t.fontSizeSm, color: t.colorNeutral900, fontWeight: t.fontWeightMedium }}>{item.activity?.name || item.task_name || '-'}</td>
                    <td style={{ padding: `${t.spacing3} ${t.spacing2}`, fontSize: t.fontSizeSm, color: t.colorNeutral800 }}>{item.asignee?.name || '-'}</td>
                    <td style={{ padding: `${t.spacing3} ${t.spacing2}`, fontSize: t.fontSizeSm, color: t.colorNeutral800 }}>{item.location?.name || '-'}</td>
                    <td style={{ padding: `${t.spacing3} ${t.spacing2}`, fontSize: t.fontSizeSm, color: t.colorNeutral600 }}>{dateString}</td>
                    <td style={{ padding: `${t.spacing3} ${t.spacing2}` }}>
                      <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: t.radiusFull, backgroundColor: statusBg, color: statusColor, fontSize: '12px', fontWeight: t.fontWeightSemibold }}>
                        {item.status || 'Unknown'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
