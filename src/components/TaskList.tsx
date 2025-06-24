import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Check, Trash2, Calendar } from 'lucide-react';

export const TaskList: React.FC = () => {
  const { tasks, completeTask, deleteTask } = useApp();
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Calendar className="w-12 h-12 mx-auto" />
        </div>
        <p className="text-gray-500 text-lg">No tasks yet!</p>
        <p className="text-gray-400">Add your first task above to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {incompleteTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            To Do ({incompleteTasks.length})
          </h3>
          <div className="space-y-3">
            {incompleteTasks.map(task => (
              <div key={task.id} className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">{task.title}</h4>
                    {task.description && (
                      <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                    )}
                    <p className="text-gray-400 text-xs">
                      Created {formatDate(task.createdAt)}
                    </p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => completeTask(task.id)}
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                      title="Complete task"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Completed ({completedTasks.length})
          </h3>
          <div className="space-y-3">
            {completedTasks.map(task => (
              <div key={task.id} className="bg-green-50 rounded-xl border border-green-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-green-800 mb-1 line-through">{task.title}</h4>
                    {task.description && (
                      <p className="text-green-700 text-sm mb-2 line-through">{task.description}</p>
                    )}
                    <p className="text-green-600 text-xs">
                      Completed {task.completedAt ? formatDate(task.completedAt) : 'Recently'}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-green-600 hover:text-red-600 p-1 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};