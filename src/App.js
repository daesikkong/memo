import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// Supabase 설정 (사용자의 Supabase URL과 API 키로 교체)
const supabaseUrl = 'https://ohqlydlhhfhccvetsoav.supabase.co';
const supabaseKey = 'sb_publishable_ZjVOffszkeyW1elB999F3g_kh1xOBd1';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('memos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching memos:', error);
    } else {
      setMemos(data);
    }
    setLoading(false);
  };

  const addMemo = async (title, content) => {
    const { data, error } = await supabase
      .from('memos')
      .insert([{ title, content }])
      .select();

    if (error) {
      console.error('Error adding memo:', error);
    } else {
      setMemos([data[0], ...memos]);
    }
  };

  const updateMemo = async (id, title, content) => {
    const { error } = await supabase
      .from('memos')
      .update({ title, content })
      .eq('id', id);

    if (error) {
      console.error('Error updating memo:', error);
    } else {
      setMemos(memos.map(memo => memo.id === id ? { ...memo, title, content } : memo));
    }
  };

  const deleteMemo = async (id) => {
    const { error } = await supabase
      .from('memos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting memo:', error);
    } else {
      setMemos(memos.filter(memo => memo.id !== id));
    }
  };

  return (
    <div className="App">
      <h1>Memo App</h1>
      <MemoForm onAdd={addMemo} />
      {loading ? <p>Loading...</p> : <MemoList memos={memos} onUpdate={updateMemo} onDelete={deleteMemo} />}
    </div>
  );
}

function MemoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onAdd(title, content);
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="memo-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add Memo</button>
    </form>
  );
}

function MemoList({ memos, onUpdate, onDelete }) {
  return (
    <div className="memo-list">
      {memos.map(memo => (
        <MemoItem key={memo.id} memo={memo} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}

function MemoItem({ memo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  const handleSave = () => {
    onUpdate(memo.id, title, content);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(memo.title);
    setContent(memo.content);
    setIsEditing(false);
  };

  return (
    <div className="memo-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{memo.title}</h3>
          <p>{memo.content}</p>
          <small>{new Date(memo.created_at).toLocaleString()}</small>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(memo.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default App;