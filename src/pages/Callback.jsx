import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom'
import { oAuthLogin } from '../apis/auth/login';
import { UserContext } from '../App';
import coreApi from '../core/axios';
import LoadingPage from './LoadingPage'

const Callback = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    const {vendor} = useParams();
    const {mutateAsync} = useMutation(
        oAuthLogin
    );

    useEffect(() =>{
        const query = window.location.search;
        async function getData(){
            const data = await mutateAsync({vendor, query});
            setUser(data);
            localStorage.setItem("token", data.accessToken);
            coreApi.defaults.headers.common["Authorization"] = "Bearer " + data.accessToken;
            navigate("/")
        }

        getData();
    },[])

  return (
    <div><LoadingPage/></div>
  )
}

export default Callback