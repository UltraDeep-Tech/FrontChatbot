import { useRef } from 'react';
import { PulseLoader } from 'react-spinners';
import { Id, ToastContainer, toast } from 'react-toastify';
function UploadingProgress(progress: number, toastId: { current: Id | null; }) {

    const Msg = ({ msg, val }: { msg: any, val: any }) => (
        <div>
            {msg}
            <PulseLoader color={"#ff6a3d"} loading={val} size={6} />
        </div>
    )

    if (toastId.current === null) {
        toastId.current = toast(<Msg msg="Uploading..." val={true} />, { progress, position: toast.POSITION.TOP_CENTER })
    } else {
        toast.update(toastId.current, { progress })
    }
}

export default UploadingProgress;