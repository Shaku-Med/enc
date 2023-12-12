import React, { useContext, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Conn } from '../../Conn';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js'
import { enc, dec } from 'medto'
import * as device from 'react-device-detect'
import {v4 as uuid} from 'uuid'

let Data = ({ isenc }) => {
    const {toenc, settoenc} = useContext(Conn);

    const [choose, setchoose] = useState(`file`);
    const [show, setshow] = useState(false)
    // 
    const [sub, setsub] = useState(false)

    //

    const [enckey, setenckey] = useState(``)
    const [securitykey, setsecuritykey] = useState(``)
    // 
    const [input, setinput] = useState(``)
    // 
    const [file, setfile] = useState([])

    //

    const handleChange = async (e) => { 
        let ft = e.target.files[0]
        if (ft) { 
            let reader = new FileReader()
            if (isenc) { 
                // 
            reader.onloadend = () => { 
                let result = reader.result
                // 
                let uint = new Uint8Array(result)
                let array = Array.from(uint)
                // 
                let ar = { 
                    name: ft.name,
                    type: ft.type,
                    lastModifiedDate: ft.lastModifiedDate,
                    lastModified: ft.lastModified,
                    size: ft.size,
                    file: array
                }
                // 
                setfile([ar])
            }
            // 
            reader.readAsArrayBuffer(ft)
            }
            else { 
                reader.onloadend = () => { 
                    setinput(reader.result)
                }
                reader.readAsText(ft)
            }
        }
    }

    let EN = (data) => {
        try {
            let ec = CryptoJS.AES.encrypt(JSON.stringify(data), enckey).toString();
            let ecc = CryptoJS.AES.encrypt(ec, securitykey).toString();
            // 
            // let ec1 = enc(ecc, enckey)
            // let ec2 = enc(ec1, securitykey)
            // 
            return ecc
        }
        catch {
            return null
        }
    };

    let DC = (data) => {
        try {
            // let ec2 = dec(data, securitykey)
            // let ec1 = dec(ec2, enckey)
            // 
            let ecc = CryptoJS.AES.decrypt(data, securitykey).toString(CryptoJS.enc.Utf8);
            let ec = CryptoJS.AES.decrypt(ecc, enckey).toString(CryptoJS.enc.Utf8);
            // 
            return JSON.parse(ec)
        }
        catch {
            return null
        }
    };

    let INP = () => {
        if (isenc) {
            let data = {
                device: device,
                window: window.navigator.userAgent,
                input: input,
                enckey: enckey,
                securitykey: securitykey
            }
            let bl = EN(data)
            if (bl !== null) {
                 
                let eb = new Blob([bl], { type: `text/plain` })
                // 
                let a = document.createElement('a')
                a.download = `${uuid().toUpperCase().split('-').join('')}`
                a.href = `${URL.createObjectURL(eb)}`
                // 
                a.click()
                // 
                window.open(`${URL.createObjectURL(eb)}`, `_blank`, `left=500,top=200,width=300,height=300`)
                // 
                alert(`Data Encrypted Successfully.`)
                toast.success(`Data Encrypted Successfully.`)
            }
            else {
                toast.error(`Ouch! We had some errors, we can't encrypt your data for you. Reload and try again.`)
            }
        }
        else {
            let dc = DC(input)
            if (dc !== null) {
                if (dc.window === window.navigator.userAgent) {
                    if (dc.hasOwnProperty('file')) {
                        let blb = dc.file[0].file
                        let bl = new Uint8Array(blb)
                        // 
                        let blob = new Blob([bl], { type: dc.file[0].type })

                        window.open(`${URL.createObjectURL(blob)}`, `_blank`, `left=500,top=200,width=500,height=500`)
                    }
                    else {
                        let blob = new Blob([dc.input], { type: 'text/plain' })
                        window.open(`${URL.createObjectURL(blob)}`, `_blank`, `left=500,top=200,width=300,height=300`)
                    }
                }
                else {
                    let prompt = window.prompt(`Unrecognized Device Detected, Please ReType Your Security Key.`)
                    if (prompt === dc.securitykey) {
                        if (dc.hasOwnProperty('file')) {
                            let blb = dc.file[0].file
                            let bl = new Uint8Array(blb)
                            // 
                            let blob = new Blob([bl], { type: dc.file[0].type })

                            window.open(`${URL.createObjectURL(blob)}`, `_blank`, `left=500,top=200,width=500,height=500`)
                        }
                        else {
                            let blob = new Blob([dc.input], { type: 'text/plain' })
                            window.open(`${URL.createObjectURL(blob)}`, `_blank`, `left=500,top=200,width=300,height=300`)
                        }
                    }
                    else {
                        alert(`Wrong Security Key.`)
                    }
                }
            }
            else {
                toast.error(`Ouch! Something went wrong. This might be because of unauthorization to access this data or something. Please try again. Wrong Detail entered.`)
            }
        }
    };

    let FL = () => {
        let data = {
            device: device,
            window: window.navigator.userAgent,
            input: input,
            enckey: enckey,
            securitykey: securitykey,
            file: file
        }
        let bl = EN(data)
        // 
        if (bl !== null) {
            let eb = new Blob([bl], { type: `text/plain` })
            // 
            let a = document.createElement('a')
            a.download = `${uuid().toUpperCase().split('-').join('')}`
            a.href = `${URL.createObjectURL(eb)}`
            // 
            a.click()
            // 
            window.open(`${URL.createObjectURL(eb)}`, `_blank`, `left=500,top=200,width=300,height=300`)
            // 
            alert(`Data Encrypted Successfully.`)
            toast.success(`Data Encrypted Successfully.`)
        }
        else {
            toast.error(`Ouch! unable to encrypt file.`)
        }
    };

    const Submit = async () => { 
        if (securitykey.trim().length > 0 && enckey.trim().length > 0) { 
            if (input.trim().length > 0 && file.length < 1) { 
               INP()
            }
            else if (file.length > 0 && input.trim().length < 1) { 
                FL()
            }
            else { 
                toast.info(`Ouch! Something is empty. Check properly I won't tell you.`)
            }
        }
        else { 
            toast.info(`Some information are missing. Please check if you've entered your encryption key and securitykey as they're required.`)
        }
    }
    
    return (
        <div className="mainfinaosiuphere w-full">
            <div className="upperpathiand w-full">
              
                <div className="fileuploadpathsd">
                    <>
                                <div className="inputselection p-2 bg-[var(--border)] shadow-md mt-1 rounded-md flex items-center justify-between gap-2">
                                    {/* {
                          !isMobile ? 
                              <select onChange={e => {setchoose(e.target.value)}} className={` w-full rounded-md p-2`} id="">
                          <option value="file">Upload Files</option>
                          <option value="folder">Upload Folder</option>
                      </select> : ''
                      } */}
                                    <div className="inputcontainer w-full">
                                        <input onChange={sub ? e => {} : handleChange} type="file" name="" id="file" className="hidden" />
                                        <label className=' uppercase w-full flex items-center justify-center shadow-md p-2 bg-success rounded-md' htmlFor="file">
                                            Choose {choose === 'file' ? 'Files' : choose}
                                        </label>
                                    </div>
                                </div>

                                <div className="ortxtsd flex items-center justify-center w-full p-2 uppercase text-[20px] font-bold">
                                    OR
                                </div>

                            </> 
                    <div className="labelaidnoas uppercase p-1 text-lg opacity-[.6]">
                        Enter Text
                    </div>
                  
                    <textarea onChange={e => {setinput(e.target.value)}}  placeholder='Enter Your Text' className="aidnlineadeinasdea min-h-[200px] w-full resize-none p-2 brd rounded-md shadow-md outline-none bg-[var(--border)]" />

                    <div className="aindkkkeinalssdead flex items-center justify-center gap-2">
                        <div className="pincontainer relative overflow-hidden rounded-md">
                            <input onChange={e => {setenckey(e.target.value)}} type={`${show ? `text` : `password`}`} className=" pl-[50px] outline-none w-full pt-2 pb-2 pr-2 rounded-md bg-[var(--border)] shadow-md" placeholder='Encryption Key' id="" />
                            <i onClick={e => { setshow(show ? false : true) }} className={`bi cursor-pointer ${show ? `bi-eye` : `bi-eye-slash`} h-full w-10 ${show ? `bg-danger` : `bg-primary`} flex items-center justify-center absolute top-0 left-0`} />
                        </div>
                  
                        <div className="pincontainer relative overflow-hidden rounded-md">
                            <input onChange={e => {setsecuritykey(e.target.value)}}  type={`${show ? `text` : `password`}`} className=" pl-[50px] outline-none w-full pt-2 pb-2 pr-2 rounded-md bg-[var(--border)] shadow-md" placeholder='Security Code' id="" />
                            <i onClick={e => { setshow(show ? false : true) }} className={`bi cursor-pointer ${show ? `bi-eye` : `bi-eye-slash`} h-full w-10 ${show ? `bg-danger` : `bg-primary`} flex items-center justify-center absolute top-0 left-0`} />
                        </div>
                    </div>

                    <button onClick={sub ? e => {} : Submit} disabled={sub} className={`submitbttsoanos btn flex items-center rounded-lg justify-center bg-[var(--border)] text-[var(--mainCl)] w-full mt-2 outline-none hover:brightness-110 shadow-md brd uppercase ${sub ? `pointer-events-none` : ``}`}>
                        {isenc ? `Encrypt` : `Decrypt`}
                    </button>

                    <div onClick={e => {settoenc(isenc ? false : true)}} className="asktonavigates backdrop-blur-md sticky bottom-0 text-sm uppercase p-2 text-center">
                        <span>I want to </span>
                        <span className={` hover:underline cursor-pointer text-primary`}>{isenc ? `Decrypt ` : `Encrypt `}</span>
                        <span>My Text</span>
                    </div>
                  
                </div>
            </div>
        </div>
    );
}

export default Data
