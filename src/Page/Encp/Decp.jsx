import React from 'react'
import Data from './Data'

let Decp = ({isenc}) => {
  return (
    <div className=' min-w-[400px] max-[600px]:min-w-[350px]'>
            <div className="aidnfliansdinheader text-center uppercase font-bold p-2 text-[20px]">
                Decrypt your data
            </div>
            <hr />
            <div className="containerboxinaodmina">
                <Data isenc={isenc}/>
            </div>
        </div>
  )
}

export default Decp
