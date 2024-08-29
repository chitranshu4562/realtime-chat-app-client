import {useEffect, useState} from "react";
import ModalBox from "../ModalBox.jsx";
import {Button} from "@mui/material";
import CustomMultiSelect from "../custom-multi-select/CustomMultiSelect.jsx";
import {displayLoader, hideLoader} from "../../utils/loaderHelper.js";
import {errorNotification, successNotification} from "../../utils/notificationHelper.js";
import {createGroup} from "../../api/groupApi.js";
import {getUsers} from "../../api/usersApi.js";

export default function CreateGroup({open, onClose}) {
    const [contacts, setContacts] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [groupName, setGroupName] = useState('');

    useEffect(() => {
        displayLoader();
        getUsers()
            .then(result => {
                hideLoader();
                const temp = result.data.contacts.map(contact => {
                    return {
                        value: contact._id,
                        label: contact.name
                    }
                })
                setContacts(temp);
            })
            .catch(error => {
                hideLoader();
                errorNotification(error.response.data.message);
            });
    }, []);

    const handleParticipantsChange = (selectedValues) => {
        setParticipants(selectedValues);
    }

    const handleClose = () => {
        handleReset();
        onClose();
    }

    const handleInputChange = (e) => {
        setGroupName(e.target.value);
    }

    const handleReset = () => {
        setGroupName('');
        setParticipants([]);
    }

    const handleGroupCreation = (e) => {
        e.preventDefault();
        const formData = {
            name: groupName,
            participants: participants
        }
        displayLoader();
        createGroup(formData)
            .then(result => {
                hideLoader();
                successNotification(result.data.message);
                console.log(result.data.data);
                handleClose();
            })
            .catch(error => {
                hideLoader();
                errorNotification(error.response.data.message);
            })
    }

    return (
        <>
            <ModalBox isOpen={open}>
                <form onSubmit={handleGroupCreation}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={groupName} onChange={handleInputChange} className={`form-control my-2`} />
                    <CustomMultiSelect
                        classNames={`w-100`}
                        placeHolder="Select participants"
                        value={participants}
                        onChange={handleParticipantsChange}
                        options={contacts}/>
                    <div className={`d-flex justify-content-center gap-2`}>
                        <Button variant="contained" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" type="submit">Create Group</Button>
                    </div>
                </form>
            </ModalBox>

        </>
    )
}
