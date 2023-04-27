//#region Import
import { Alert } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react'
//#endregion

const AlertMessage = () => {
    return (
        <Alert icon={<AlertCircle size={16} />} title="SUP BRO!" variant='outline' sx={{ fontFamily: 'karla, sans-serif' }}>
            This UI is still in experimentation. You can suggest UI so I can implement it.
        </Alert>
    )
}

export default AlertMessage;