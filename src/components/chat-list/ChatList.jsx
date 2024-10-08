import {useCallback, useEffect, useState} from "react";
import classes from "./ChatList.module.css";
import {Button} from "@mui/material";
import {debounce} from "lodash";
import {getGroups} from "../../api/groupApi.js";
import {getUsers} from "../../api/usersApi.js";
import {displayLoader, hideLoader} from "../../utils/loaderHelper.js";
import {errorNotification, successNotification} from "../../utils/notificationHelper.js";
import ChatCard from "../chat-card/ChatCard.jsx";
import {Link, useNavigate} from "react-router-dom";

export default function ChatList() {
    const navigate = useNavigate();
    const [isGroup, setIsGroup] = useState(false);
    const [listData, setListData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleTabChange = (identifier) => {
        setSearchQuery('');
        setSearchInput('');
        if (identifier === 'USERS') {
            setIsGroup(false);
        } else if (identifier === 'GROUPS') {
            setIsGroup(true);
        }
        navigate('/home');
    }

    const getApiFunction = () => {
        displayLoader();
        if (isGroup) {
            return getGroups(searchQuery);
        } else {
            return getUsers(searchQuery);
        }
    }

    useEffect(() => {
        getApiFunction()
            .then(result => {
                hideLoader();
                successNotification(result.data.message);
                setListData(result.data.data);
            })
            .catch(error => {
                hideLoader();
                errorNotification(error.response.data.message);
            })
    }, [isGroup, searchQuery]);

    const debouncedFunction = useCallback(debounce(value => {
        setSearchQuery(value);
    }, 500), []);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
        debouncedFunction(e.target.value);
    }

    return (
        <>
            <div>
                <div className={`d-flex my-1 justify-content-between gap-2`}>
                    <Button
                        variant={isGroup ? '' : 'contained'}
                        onClick={() => handleTabChange('USERS')}
                    >users</Button>
                    <Button
                        variant={isGroup ? 'contained' : ''}
                        onClick={() => handleTabChange('GROUPS')}
                    >groups</Button>
                </div>

                <div className={`w-100`}>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleInputChange}
                        placeholder={isGroup ? 'Search groups' : 'Search users'}
                        className={`form-control w-100`}
                    />
                </div>

                <div className={classes.userList}>
                    {listData.length === 0 && (
                        <h6 className={`text-center my-2`}>No data found</h6>
                    )}
                    {listData.length > 0 && listData.map(data => {
                        return (
                            <Link to={`conversation/${data._id}/${isGroup}`} key={data._id}>
                                <ChatCard key={data._id} cardData={data} />
                            </Link>
                        )
                    })}
                </div>

            </div>
        </>
    )
}
