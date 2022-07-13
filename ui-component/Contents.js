import bstyles from '../styles/Button.module.css'
import { useRouter } from 'next/router'
import { Button } from '@mantine/core'
const Content = () => {
    const router = useRouter()
    return (
        <div className={bstyles.bmenu}>
            <Button onClick={() => router.push('/do-list', undefined, { shallow: true })} className={bstyles.mb}>To-do List</Button>
        </div>
    )
}
export default Content;