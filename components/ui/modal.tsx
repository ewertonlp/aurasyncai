import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const ModalTrigger = DialogPrimitive.Trigger;
const ModalContent = DialogPrimitive.Content;
const ModalTitle = DialogPrimitive.Title;
const ModalDescription = DialogPrimitive.Description;
const ModalOverlay = DialogPrimitive.Overlay;
const ModalClose = DialogPrimitive.Close;

// Our own header and footer components
const ModalHeader = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div className={className}>{children ?? null}</div>
);

const ModalFooter = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div className={className}>{children ?? null}</div>
);

interface ModalProps {
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({ className, children }: ModalProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Root>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={[
          'fixed left-[50%] top-[50%] z-50 grid w-[90vw] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-popover p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 sm:rounded-lg',
          className,
        ].join('')}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button at the top right */}
        <ModalClose className="absolute top-2 right-2 rounded-sm opacity-70 hover:opacity-100 disabled:pointer-events-none" aria-label="Close">
          <span className="sr-only">Close</span>
        </ModalClose>

        <ModalHeader className="grid gap-2 text-center sm:text-left">
          <ModalTitle className="text-lg font-semibold leading-none tracking-tight text-popover-foreground" />
          <ModalDescription className="text-sm text-muted-foreground" />
        </ModalHeader>
        <div className="pt-0 pb-3">{children}</div>
        <ModalFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2" />
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  </DialogPrimitive.Portal>
);
Modal.displayName = DialogPrimitive.Root.displayName;

export { ModalTrigger, ModalContent, ModalTitle, ModalDescription, ModalOverlay, ModalClose };