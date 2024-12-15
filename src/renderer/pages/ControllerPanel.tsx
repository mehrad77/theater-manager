import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import {
  AddNewContent,
  ImportExportControls,
  PanelHeader,
  SettingsControl,
} from '../../components';
import { getFileBlob, revokeBlobUrl } from '../../fileUtils';
import { ContentControllerFactory } from '../../contents/ContentControllerFactory';
import type { Content } from '../../contents/types';
import './Controller.css';

const getDefaultHeight = (type: string) => {
  switch (type) {
    case 'image':
    case 'video':
    case 'text':
      return 14;
    case 'counter':
      return 10;
    default:
      return 14;
  }
};

export const ControllerPanel: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);

  // Load contents with file URLs
  useEffect(() => {
    const loadContents = async () => {
      const storedContents = localStorage.getItem('contents');
      if (storedContents) {
        const parsedContents: Content[] = JSON.parse(storedContents);

        // Fetch file URLs from IndexedDB
        const updatedContents = await Promise.all(
          parsedContents.map(async (content) => {
            if ('fileUrl' in content && content.fileUrl) {
              const fileBlobUrl = await getFileBlob(content.id);
              return {
                ...content,
                fileUrl: fileBlobUrl || content.fileUrl, // Use Blob URL if available
                layout: {
                  ...content.layout,
                  h: getDefaultHeight(content.type),
                },
              };
            }
            return {
              ...content,
              layout: {
                ...content.layout,
                h: getDefaultHeight(content.type),
              },
            };
          }),
        );
        setContents(updatedContents);
      }
    };

    loadContents();
  }, []);

  useEffect(() => {
    localStorage.setItem('contents', JSON.stringify(contents));
  }, [contents]);

  const [collapsedPanels, setCollapsedPanels] = useState<Set<string>>(
    new Set(),
  );

  const toggleCollapse = (id: string) => {
    setCollapsedPanels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id
          ? {
              ...content,
              layout: {
                ...content.layout,
                h: collapsedPanels.has(id) ? getDefaultHeight(content.type) : 3,
              },
            }
          : content,
      ),
    );
  };

  const deleteContent = async (id: string) => {
    const contentToDelete = contents.find((content) => content.id === id);
    if (
      contentToDelete &&
      (contentToDelete.type === 'video' || contentToDelete.type === 'image')
    ) {
      await revokeBlobUrl(id);
    }
    setContents((prevContents) =>
      prevContents.filter((content) => content.id !== id),
    );
  };
  const updateContent = <T extends Content>(
    id: string,
    updates: Partial<T>,
  ): void => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id ? ({ ...content, ...updates } as T) : content,
      ),
    );
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
        <div className="flex space-x-2">
          <SettingsControl />
          <ImportExportControls />
        </div>
        <div className="flex space-x-2">
          <AddNewContent
            addContent={(newContent) => {
              setContents((prevContents) => [
                ...prevContents,
                {
                  ...newContent,
                  layout: {
                    ...newContent.layout,
                    h: getDefaultHeight(newContent.type),
                  },
                },
              ]);
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <GridLayout
          className="layout"
          cols={24}
          rowHeight={16}
          width={window.innerWidth}
          layout={contents.map((content) => ({
            i: content.id,
            ...content.layout,
          }))}
          onLayoutChange={(layout) => {
            const updatedContents = contents.map((content) => {
              const item = layout.find((l) => l.i === content.id);
              if (item) {
                return {
                  ...content,
                  layout: { x: item.x, y: item.y, w: item.w, h: item.h },
                };
              }
              return content;
            });
            setContents(updatedContents);
          }}
          draggableCancel=".no-drag"
        >
          {contents.map((content) => {
            const isCollapsed = collapsedPanels.has(content.id);
            return (
              <div
                key={content.id}
                data-grid={{
                  ...content.layout,
                  minW: 4,
                  maxW: 24,
                  maxH: 24,
                }}
                className="bg-slate-700 rounded-lg shadow-md overflow-hidden"
              >
                <PanelHeader
                  id={content.id}
                  name={content.name || content.id}
                  type={content.type}
                  isCollapsed={isCollapsed}
                  toggleCollapse={toggleCollapse}
                  onDelete={deleteContent}
                  onRename={(id, name) => updateContent(id, { name })}
                />
                {!isCollapsed && (
                  <div className="p-2 border-t border-gray-300 no-drag">
                    <ContentControllerFactory
                      content={content}
                      onUpdate={updateContent}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </GridLayout>
      </div>
    </div>
  );
};
