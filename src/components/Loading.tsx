export function Loading() {
    return (
        <div className="flex justify-center items-center w-full h-screen fixed z-auto">
            <div className="w-14 h-14 border-[5px] border-red-400 border-t-[5px] border-t-base-red rounded-full animate-spin"></div>
        </div>
    );
}