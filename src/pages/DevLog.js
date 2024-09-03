import React, { useState } from 'react';
import './DevLog.css';

function DevLog() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [logs, setLogs] = useState({});
  const [logInput, setLogInput] = useState({ content: '', isTeam: true });
  const [projectInput, setProjectInput] = useState({ name: '', date: null });
  const [modal, setModal] = useState({ open: false, date: null });
  const [details, setDetails] = useState({ issue: '', idea: '', backlog: '', priority: 'Medium', assignee: '' });
  const [filterText, setFilterText] = useState('');

  const handleAddProject = () => {
    if (projectInput.name.trim()) {
      const newProject = { name: projectInput.name, id: Date.now() };
      setProjects([...projects, newProject]);
      setProjectInput({ ...projectInput, name: '' });
      setSelectedProject(newProject.id);
    }
  };

  const handleSelectProject = (projectId) => {
    setSelectedProject(projectId);
    setProjectInput({ ...projectInput, date: null });
  };

  const handleAddLog = () => {
    if (selectedProject && logInput.content.trim()) {
      const dateKey = new Date().toISOString().split('T')[0];
      setLogs(prevLogs => ({
        ...prevLogs,
        [selectedProject]: {
          ...prevLogs[selectedProject],
          [dateKey]: {
            ...(prevLogs[selectedProject]?.[dateKey] || {}),
            [logInput.isTeam ? 'team' : 'personal']: [
              ...(prevLogs[selectedProject]?.[dateKey]?.[logInput.isTeam ? 'team' : 'personal'] || []),
              logInput.content
            ],
            ...details
          }
        }
      }));
      setLogInput({ ...logInput, content: '' });
    }
  };

  const handleSelectDate = (date) => {
    const logDetails = logs[selectedProject]?.[date] || {};
    setDetails({
      issue: logDetails.issue || '',
      idea: logDetails.idea || '',
      backlog: logDetails.backlog || '',
      priority: logDetails.priority || 'Medium',
      assignee: logDetails.assignee || ''
    });
    setProjectInput({ ...projectInput, date });
    setModal({ open: true, date });
  };

  const handleSaveDetails = () => {
    if (selectedProject && projectInput.date) {
      setLogs(prevLogs => ({
        ...prevLogs,
        [selectedProject]: {
          ...prevLogs[selectedProject],
          [projectInput.date]: {
            ...prevLogs[selectedProject][projectInput.date],
            ...details
          }
        }
      }));
      setModal({ ...modal, open: false });
    }
  };

  const filteredLogs = Object.keys(logs[selectedProject] || {}).filter(date =>
    date.includes(filterText)
  );

  return (
    <div className="dev-log">
      <h1>Dev Log</h1>

      {!projects.length ? (
        <div className="no-project">
          <input
            className="new-project-input"
            value={projectInput.name}
            onChange={(e) => setProjectInput({ ...projectInput, name: e.target.value })}
            placeholder="프로젝트 이름 입력"
          />
          <button className="add-project" onClick={handleAddProject}>
            프로젝트 시작하기
          </button>
        </div>
      ) : (
        <>
          <div className="project-select">
            <select
              onChange={(e) => handleSelectProject(Number(e.target.value))}
              value={selectedProject || ''}
            >
              <option value="" disabled>
                프로젝트 선택
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            <input
              className="new-project-input"
              value={projectInput.name}
              onChange={(e) => setProjectInput({ ...projectInput, name: e.target.value })}
              placeholder="새 프로젝트 이름"
            />
            <button className="add-project" onClick={handleAddProject}>
              프로젝트 추가
            </button>
          </div>

          {selectedProject && (
            <>
              <div className="log-controls">
                <button
                  className={logInput.isTeam ? 'active' : ''}
                  onClick={() => setLogInput({ ...logInput, isTeam: true })}
                >
                  팀 로그
                </button>
                <button
                  className={!logInput.isTeam ? 'active' : ''}
                  onClick={() => setLogInput({ ...logInput, isTeam: false })}
                >
                  개인 로그
                </button>
              </div>

              <textarea
                className="log-input"
                value={logInput.content}
                onChange={(e) => setLogInput({ ...logInput, content: e.target.value })}
                placeholder={logInput.isTeam ? '팀 로그를 작성하세요!' : '개인 로그를 작성하세요!'}
              />
              <button className="save-log" onClick={handleAddLog}>
                저장
              </button>

              <input
                className="log-filter"
                type="text"
                placeholder="날짜 검색"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />

              <h2>{logInput.isTeam ? '팀 로그' : '개인 로그'}</h2>
              <ul className="log-list">
                {filteredLogs.map((date) => (
                  <li key={date}>
                    {date}
                    <button
                      className="view-log"
                      onClick={() => handleSelectDate(date)}
                    >
                      보기
                    </button>
                  </li>
                ))}
              </ul>

              {modal.open && (
                <div className="modal">
                  <div className="modal-content">
                    <button
                      className="close-modal"
                      onClick={() => setModal({ ...modal, open: false })}
                    >
                      &times;
                    </button>
                    <h2>{modal.date} 기록</h2>

                    <div className="modal-section">
                      <div className="modal-section-half">
                        <h3>이슈</h3>
                        <textarea
                          value={details.issue}
                          onChange={(e) => setDetails({ ...details, issue: e.target.value })}
                          placeholder="해결해야 할 이슈를 작성하세요"
                        />
                      </div>
                      <div className="modal-section-half">
                        <h3>아이디어</h3>
                        <textarea
                          value={details.idea}
                          onChange={(e) => setDetails({ ...details, idea: e.target.value })}
                          placeholder="아이디어를 작성하세요"
                        />
                      </div>
                    </div>

                    <div className="modal-section">
                      <h3>백로그</h3>
                      <textarea
                        value={details.backlog}
                        onChange={(e) => setDetails({ ...details, backlog: e.target.value })}
                        placeholder="백로그를 작성하세요"
                      />
                    </div>

                    <div className="modal-section">
                      <h3>우선순위</h3>
                      <select
                        value={details.priority}
                        onChange={(e) => setDetails({ ...details, priority: e.target.value })}
                      >
                        <option value="High">높음</option>
                        <option value="Medium">중간</option>
                        <option value="Low">낮음</option>
                      </select>
                    </div>

                    <div className="modal-section">
                      <h3>담당자</h3>
                      <input
                        type="text"
                        value={details.assignee}
                        onChange={(e) => setDetails({ ...details, assignee: e.target.value })}
                        placeholder="담당자를 입력하세요"
                      />
                    </div>

                    <button className="save-details" onClick={handleSaveDetails}>
                      저장
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default DevLog;
