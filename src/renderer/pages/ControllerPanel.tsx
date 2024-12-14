import { useState } from 'react';
import GridLayout from 'react-grid-layout';
import { ImageController } from '../../contents/Image';
import { VideoController } from '../../contents/Video';
import { TextController } from '../../contents/Text';
import { CounterController } from '../../contents/Counter';
import type {
  Content,
  CounterContent,
  ImageContent,
  TextContent,
  VideoContent,
} from '../../contents/types';
import './Controller.css';

export function ControllerPanel() {
  const [contents, setContents] = useState<Content[]>(() => {
    const storedContents = localStorage.getItem('contents');
    return storedContents ? JSON.parse(storedContents) : [];
  });

  const [collapsedPanels, setCollapsedPanels] = useState<Set<string>>(
    new Set(),
  );

  const toggleCollapse = (id: string) => {
    setCollapsedPanels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id); // Expand
      } else {
        newSet.add(id); // Collapse
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
                h: collapsedPanels.has(id) ? 6 : 2, // Adjust height dynamically
              },
            }
          : content,
      ),
    );
  };

  // Add testing content
  const addTestingContent = () => {
    const testContents: Content[] = [
      {
        id: `1${Date.now()}`,
        type: 'image',
        layout: { x: 0, y: 0, w: 4, h: 6 },
        show: true,
        position: { top: '10px', left: '20px' },
        size: { width: '200px', height: '150px' },
        file: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
      } as ImageContent,
      {
        id: `2${Date.now()}`,
        type: 'video',
        layout: { x: 4, y: 0, w: 4, h: 6 },
        show: true,
        position: { top: '50px', left: '100px' },
        size: { width: '400px', height: '300px' },
        file: 'data:video/mp4;base64,AAAA...',
        autoplay: false,
        loop: true,
      } as VideoContent,
      {
        id: `3${Date.now()}`,
        type: 'text',
        layout: { x: 8, y: 0, w: 4, h: 6 },
        show: true,
        position: { top: '150px', left: '200px' },
        size: { width: '300px', height: '50px' },
        text: 'Sample Text Content',
        fontSize: '18px',
        color: '#333333',
        alignment: 'center',
      } as TextContent,
      {
        id: `4${Date.now()}`,
        type: 'counter',
        layout: { x: 0, y: 1, w: 4, h: 6 },
        show: true,
        position: { top: '250px', left: '300px' },
        size: { width: '100px', height: '50px' },
        count: 5,
        paused: false,
      } as CounterContent,
    ];

    setContents([...contents, ...testContents]);
  };

  const updateContent = <T extends Content>(
    id: string,
    updates: Partial<T>,
  ): void => {
    setContents((prevContents) =>
      prevContents.map((content) => {
        if (content.id === id) {
          // Narrow down to specific content type
          switch (content.type) {
            case 'image':
              return { ...content, ...updates } as ImageContent;
            case 'video':
              return { ...content, ...updates } as VideoContent;
            case 'text':
              return { ...content, ...updates } as TextContent;
            case 'counter':
              return { ...content, ...updates } as CounterContent;
            default:
              return content;
          }
        }
        return content;
      }),
    );
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
        <div className="flex space-x-2">
          <button
            type="button"
            className="bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600"
            onClick={() => console.log('Settings clicked')}
          >
            Settings
          </button>
          <button
            type="button"
            className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600"
            onClick={() => console.log('Import clicked')}
          >
            Import
          </button>
          <button
            type="button"
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => console.log('Export clicked')}
          >
            Export
          </button>
          <button
            type="button"
            className="bg-purple-500 px-4 py-2 rounded-md hover:bg-purple-600"
            onClick={addTestingContent}
          >
            Add Testing Content
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <GridLayout
          className="layout"
          cols={12}
          rowHeight={30}
          width={1200}
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
                }}
                className="bg-slate-700 rounded-lg shadow-md overflow-hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-2 bg-gray-800 cursor-pointer">
                  <h3 className="text-lg font-semibold">
                    {content.type.toUpperCase()} Controller
                  </h3>
                  <button
                    type="button"
                    onClick={() => toggleCollapse(content.id)}
                    className="text-white no-drag"
                  >
                    {isCollapsed ? '▼' : '▲'}
                  </button>
                </div>
                {!isCollapsed && (
                  <div className="p-4 border-t border-gray-300">
                    {(() => {
                      switch (content.type) {
                        case 'image':
                          return (
                            <ImageController
                              content={content}
                              onUpdate={(updates) =>
                                updateContent(content.id, updates)
                              }
                            />
                          );
                        case 'video':
                          return (
                            <VideoController
                              content={content}
                              onUpdate={(updates) =>
                                updateContent(content.id, updates)
                              }
                            />
                          );
                        case 'text':
                          return (
                            <TextController
                              content={content}
                              onUpdate={(updates) =>
                                updateContent(content.id, updates)
                              }
                            />
                          );
                        case 'counter':
                          return (
                            <CounterController
                              content={content}
                              onUpdate={(updates) =>
                                updateContent(content.id, updates)
                              }
                            />
                          );
                        default:
                          return null;
                      }
                    })()}
                  </div>
                )}
              </div>
            );
          })}
        </GridLayout>
      </div>
    </div>
  );
}
