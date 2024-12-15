/* eslint-disable no-alert */
import React from 'react';
import { exportData, importData } from '../fileUtils';

const ImportExportControls: React.FC = () => {
  const handleImport = async () => {
    if (
      !window.confirm(
        'Importing will reset the current data. Do you want to proceed?',
      )
    ) {
      return;
    }

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.appdata';
    fileInput.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        await importData(file);
        window.location.reload();
      }
    };
    fileInput.click();
  };

  const handleExport = async () => {
    const now = new Date();
    const exportName = `export-${now.toISOString().replace(/[:.]/g, '-')}`;

    const blob = await exportData();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exportName}.appdata`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        type="button"
        className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600"
        onClick={handleImport}
      >
        Import
      </button>
      <button
        type="button"
        className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
        onClick={handleExport}
      >
        Export
      </button>
    </>
  );
};

export default ImportExportControls;
