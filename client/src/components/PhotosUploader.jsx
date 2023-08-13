import axios from "axios";
import {useState} from "react";

export default function PhotosUploader({addedPhotos, onChange}) {
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(event) {
        event.preventDefault();
        const {data: filename} = await axios.post('/upload-by-link', {link: photoLink});
        onChange(prevState => {
            return [...prevState, filename];
        });
        setPhotoLink('');
    }

    function uploadPhoto(event) {
        const files = event.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('/upload', data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(response => {
            const {data: filenames} = response;
            onChange(prevState => {
                return [...prevState, ...filenames];
            });
        });
    }

    return (
        <>
            <div className="flex gap-2">
                <input type="text"
                       value={photoLink}
                       onChange={event => setPhotoLink(event.target.value)}
                       placeholder={'Add using a link ... jpg'}/>
                <button className="bg-gray-200 px-4 rounded-2xl"
                        onClick={addPhotoByLink}>
                    Add&nbsp;photo
                </button>
            </div>

            {/* Upload photos from device part */}
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                    <div key={index} className="h-48 flex">
                        <img src={'http://localhost:4000/uploads/' + link}
                             alt={link}
                             className="rounded-2xl w-full object-cover"
                        />
                    </div>
                ))}

                <label
                    className="h-48 flex justify-center items-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-500 cursor-pointer">
                    <input type="file"
                           multiple={true}
                           name="file"
                           id="file"
                           className="hidden"
                           onChange={uploadPhoto}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
                    </svg>
                    Upload
                </label>
            </div>
        </>
    )

}