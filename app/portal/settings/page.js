'use client';

import { useEffect, useState } from 'react';
import { PortalHeroBlock } from '../../../components/portal-ui';

export default function SettingsPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/portal/profile');
        if (res.ok) {
          const { data } = await res.json();
          setProfile(data);
          setFullName(data.full_name || '');
          setPhone(data.phone || '');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/portal/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, phone })
      });
      if (res.ok) {
        const { data } = await res.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="card"><p>Loading settings…</p></div>;
  }

  return (
    <div className="portal-stack">
      <PortalHeroBlock 
        eyebrow="Account settings" 
        title="Manage your investor profile" 
        description="Maintain contact details, entity information, and communication preferences." 
      />
      <div className="grid-2">
        <div className="card form-shell">
          <div className="form-field-group">
            <label className="form-label">Full name</label>
            <input className="field" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="form-field-group">
            <label className="form-label">Phone</label>
            <input className="field" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <button className="button button-primary" type="button" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
        <div className="card">
          <span className="eyebrow">Account info</span>
          <h3>Current status</h3>
          <div className="portal-list">
            <div className="portal-list-row"><strong>Email</strong><span>{profile?.email || 'N/A'}</span></div>
            <div className="portal-list-row"><strong>Onboarding</strong><span>{profile?.onboarding_step?.replace(/_/g, ' ') || 'Pending'}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
