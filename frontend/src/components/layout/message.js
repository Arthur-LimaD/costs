import React, {useState, useEffect} from "react"
import styles from './message.module.css'

function Message ({msg, type}) {

    const [visible, setVisible] = useState(false);

    useEffect(()=> {
        if(!msg){
            setVisible(false);
            return
        }else{
            setVisible(true)
        }
        
        const timer = setTimeout(()=> {
            setVisible(false)
            
        }, 3000)
        return () => clearTimeout(timer)
    }, [msg])

    

    return (
        <>
         {visible && (
            <div className={`${styles.msg} ${styles[type]}`}>
                {msg}
            </div>
         )}
        </>
        
    )
}

export default Message