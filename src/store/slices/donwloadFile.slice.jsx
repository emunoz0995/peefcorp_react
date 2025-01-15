import { createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../store/constans/';


export const donwloadFileSlice = createSlice({
    name: 'donwloadFile',
    initialState: false,
    reducers: {
        setDownLoad: (state, action) => {
            return action.payload
        }
    }
})

export const donwloadFileThunk = (filename) => dispatch => {
    fetch(`${API_BASE_URL}/download/${filename}`)
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Error al descargar el archivo.');
        })
        .then(blob => {
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => {
            console.log('Error:', error);
        });
};

export const { setDownLoad } = donwloadFileSlice.actions;

export default donwloadFileSlice.reducer;
