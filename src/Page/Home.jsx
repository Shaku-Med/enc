import React, { useContext, useState } from 'react'
import Decp from './Encp/Decp';
import Encp from './Encp/Encp';
import { motion } from 'framer-motion';
import { Conn } from '../Conn';

let Home = () => {
   const {toenc, settoenc} = useContext(Conn)

    return (
        <div className={`aidnlarrange w-full h-full fixed top-0 left-0 flex items-center justify-center p-2`}>
            <motion.div initial={{
                opacity: 0,
                scale: 1.5
            }} animate={{
                opacity: 1,
                scale: 1
                }} exit={{
                opacity: .6,
                scale: 2
            }} className={`containerbox overflow-auto bg-[var(--basebg)] h-fit max-h-[500px] p-2 rounded-lg shadow-md w-fit max-w-[600px] brd`}>
                {
                    !toenc ?
                        <Decp isenc={toenc} /> :
                        <Encp isenc={toenc} />
                }
            </motion.div>
        </div>
    );
}

export default Home
