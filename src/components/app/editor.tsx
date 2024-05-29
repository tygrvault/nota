import { useRef } from "react";
import { cn } from "@udecode/cn";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { commentsUsers, myUserId } from "@/lib/plate/comments";
import { MENTIONABLES } from "@/lib/plate/mentionables";
import { plugins } from "@/lib/plate/plate-plugins";
import { CommentsPopover } from "@/components/plate-ui/comments-popover";
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { MentionCombobox } from "@/components/plate-ui/mention-combobox";
import { ScrollArea } from "../ui/scroll-area";

export default function PlateEditor() {
    const containerRef = useRef(null);

    const initialValue = [
        {
            caption: [
                {
                    text: "",
                },
            ],
            children: [
                {
                    text: "",
                },
            ],
            type: "img",
            url: "https://github.com/tygrxqt/nota/blob/canary/assets/banner.png?raw=true",
            id: "1",
        },
        {
            children: [
                {
                    text: "What is Nota?",
                },
            ],
            type: "h2",
            id: "2",
        },
        {
            children: [
                {
                    text: "Nota is an note taking application build with Tauri and React. It aims to provide an open-source, cross-platform platform for the modern era.",
                },
            ],
            type: "p",
            id: "3",
        },
        {
            children: [
                {
                    text: "Warning: Nota is currently in alpha stages of development, breaking changes, bugs and missing features are to be expected.",
                },
            ],
            type: "blockquote",
            id: "4",
        },
        {
            children: [
                {
                    text: "Contact",
                },
            ],
            type: "h2",
            id: "5",
        },
        {
            children: [
                {
                    text: "If you need to contact me, please send inquires via email: ",
                },
                {
                    children: [
                        {
                            text: "hi@tygr.dev",
                        },
                    ],
                    type: "a",
                    url: "mailto:hi@tygr.dev",
                    id: "6a",
                },
                {
                    text: ".",
                },
            ],
            type: "p",
            id: "6",
        },
        {
            type: "p",
            id: "7",
            children: [
                {
                    text: "All spam and advertising will be filtered out and discarded. Serious messages only please.",
                },
            ],
        },
    ];

    return (
        <DndProvider backend={HTML5Backend}>
            <CommentsProvider users={commentsUsers} myUserId={myUserId}>
                <Plate
                    plugins={plugins}
                    initialValue={initialValue}
                    onChange={(value) => {
                        console.log(value);
                    }}
                >
                    <div
                        ref={containerRef}
                        className={cn(
                            "relative",
                            // Block selection
                            "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4 w-full"
                        )}
                    >
                        <FixedToolbar>
                            <FixedToolbarButtons />
                        </FixedToolbar>
                        <div className="flex flex-col items-center w-full">
                            <ScrollArea className="w-full max-w-[1240px] max-h-screen-no-toolbar">
                                <Editor
                                    className="w-full px-6 py-4 h-screen-no-toolbar hyphens-auto text-pretty bg-neutral-100/50 dark:bg-neutral-900/50"
                                    autoFocus
                                    focusRing={false}
                                    variant="ghost"
                                    size="md"
                                />
                            </ScrollArea>
                        </div>

                        <FloatingToolbar>
                            <FloatingToolbarButtons />
                        </FloatingToolbar>

                        <MentionCombobox items={MENTIONABLES} />

                        <CommentsPopover />

                        <CursorOverlay containerRef={containerRef} />
                    </div>
                </Plate>
            </CommentsProvider>
        </DndProvider>
    );
}
