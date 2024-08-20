/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react'
import Dropzone from 'react-dropzone'
import Image from 'next/image'
import { toast } from 'react-toastify';
import { BsArrow90DegUp } from 'react-icons/bs';
import { FaArrowUp } from 'react-icons/fa';

export default function App({ size, images, setimages }: { size: number, images: File[], setimages: any }) {
  const [preview, setPreview] = useState<any[]>()
  const notifyerorr = (id: string, msg: any) => {
    toast.error(`${msg}!`, { position: toast.POSITION.TOP_CENTER, toastId: id })
  }
  const handleDrop = (acceptedFiles: any[], fileRejections: { file: any; errors: any; }[]) => {
    console.log(acceptedFiles, 'drag')
    setimages(acceptedFiles)
    acceptedFiles?.map((f) => {
      const s = new Buffer(f[0]).toString('base64')
      console.log(s)
      const objectUrl = URL.createObjectURL(f)
      console.log('drag', objectUrl)
    })
    if (fileRejections) {
      fileRejections.map(({ file, errors }) => {
        {
          errors.map((e: any) => {
            console.log(e)
            notifyerorr('errimage', e.message)
          })
        }
      })
    }
  }
  useEffect(() => {
    console.log('drag', images)
    preview?.map((p) => URL.revokeObjectURL(p))
    if (images?.length < 1) {
      setPreview([])
      return
    }
    const pre: any[] = []
    images?.map((f) => {
      console.log('drag', f)
      const objectUrl = URL.createObjectURL(f)
      pre.push(objectUrl)
    })

    setPreview(pre)
    // free memory when ever this component is unmounted
    return () => { preview?.map((p) => URL.revokeObjectURL(p)) }
  }, [images])

  return (
    <div className="App flex justify-center items-center">
      <Dropzone onDrop={handleDrop} maxFiles={1} minSize={1024} maxSize={100000000}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'dropzone' })}>

            <div className="flex justify-center items-center float-right w-full">



              <div className="w-11/12 mx-auto shadow rounded-2xl bg-surface ">
                <div className="pt-2 flex justify-center items-center">
                  <div className=' absolute ml-20 mt-20'>
                    <FaArrowUp className='text-white -700  bg-slate-600 p-1 rounded-lg ' size={20} />

                  </div>
                  {preview?.length == 0 ? (<>
                  </>) : (<>
                    <div className={`w-[${size} h-[${size} relative overflow-hidden rounded-full`}>

                      {preview?.map((p, i) => (

                        <img
                          src={p}
                          alt={`Profile Picture`}
                          className={` w-${size} h-${size} object-cover rounded-full mx-auto mb-4 bg-white`}
                          style={{ width: size, height: size }}
                        />
                      ))}
                    </div>

                  </>)}

                  <input  {...getInputProps()} />

                </div>
              </div>

            </div>
          </div>

        )}
      </Dropzone>
    </div>
  )
}
