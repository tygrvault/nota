"use client";

import { useRef } from "react";
import { cn } from "@udecode/cn";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
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
import { ELEMENT_H2 } from "@udecode/plate-heading";
import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import { ScrollArea } from "../ui/scroll-area";

export default function PlateEditor() {
    const containerRef = useRef(null);

    const initialValue = [
        {
            id: "1",
            type: ELEMENT_H2,
            children: [{ text: "Welcome to Nota!" }],
        },
        {
            id: "2",
            type: ELEMENT_PARAGRAPH,
            children: [
                { text: "An open-source and cross-platform note taking app." },
            ],
        },
        {
            id: "3",
            type: ELEMENT_BLOCKQUOTE,
            children: [{ text: "CTRL + A + Backspace to clear all text." }],
        },
    ];

    return (
        <DndProvider backend={HTML5Backend}>
            <CommentsProvider users={commentsUsers} myUserId={myUserId}>
                <Plate plugins={plugins} initialValue={initialValue}>
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
                        <ScrollArea className="h-screen-no-toolbar">
                            <Editor
                                className="px-[96px] py-12 flex-wrap"
                                autoFocus
                                focusRing={false}
                                variant="ghost"
                                size="md"
                            />
                        </ScrollArea>

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
