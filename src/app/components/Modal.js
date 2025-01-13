export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="relative min-h-[calc(100vh-4rem)] flex items-center p-4 w-full">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    );
  }