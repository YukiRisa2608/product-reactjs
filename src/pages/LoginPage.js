import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../utils/api";
import { CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Sử dụng instance Axios đã cấu hình trong file api để gửi yêu cầu POST
        const response = await api().post('/auth/sign-in', { username: userName, password });
        // Lưu token vào localStorage
        localStorage.setItem('token', response.data.token);
        // Chuyển hướng đến trang sản phẩm sau khi đăng nhập thành công
        navigate('/admin/products');
    };

    //View
    return (
        <CDBContainer>
            <CDBCard style={{ width: '30rem' }}>
                <CDBCardBody className="mx-4">
                    <div className="text-center mt-4 mb-2">
                        <p className="h4 font-weight-bold"> Sign in </p>
                    </div>
                    {/* Email & Password */}
                    <CDBInput label="UserName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <CDBInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />


                    <p className="mt-n3 text-end ">
                        <CDBLink className="p-0" to="#">
                            Forgot Password ?
                        </CDBLink>
                    </p>
                    {/* Button Sign-in */}
                    <CDBBtn color="dark" className="btn-block my-4 mx-0" onClick={handleLogin}>
                        Sign in
                    </CDBBtn>
                    <p className="text-center"> or sign in with</p>
                    <div className="flex-row my-3 d-flex justify-content-center">
                        <CDBBtn color="white" className="m-0">
                            <CDBIcon fab icon="facebook-f" />
                        </CDBBtn>
                        <CDBBtn color="white" className="m-0">
                            <CDBIcon fab icon="twitter" />
                        </CDBBtn>
                        <CDBBtn color="white" className="m-0">
                            <CDBIcon fab icon="google-plus-g" />
                        </CDBBtn>
                    </div>
                    <hr />
                    <p className="text-center">
                        Not a member?{' '}
                        <CDBLink className="d-inline p-0" to="#">
                            Sign up
                        </CDBLink>
                    </p>
                </CDBCardBody>
            </CDBCard>
        </CDBContainer>
    );
};
export default LoginPage;