import { useSession } from 'next-auth/react';
import { useState } from 'react';
import styles from '../styles/Login.module.scss';

export default function Trail(){
    const [trails, setTrails]:any = useState({trail1: false, trail2:false, trail3: false})
    const { data: session } = useSession();

    function submitTrail(){
    }

    function setTrail(event: React.MouseEvent<HTMLButtonElement>){
        const trail = event.currentTarget.name
        let newTrails = {...trails}
        newTrails[trail] = !newTrails[trail]
        setTrails({...newTrails})
    }

    return (
        <div className={styles.container} >
            <button name='trail1' onClick={setTrail} >trail 1</button>
            <button name='trail2' onClick={setTrail} >trail 2</button>
            <button name='trail3' onClick={setTrail} >trail 3</button>
            <button type="submit" onClick={submitTrail} >submit</button>
        </div>
    );
}


