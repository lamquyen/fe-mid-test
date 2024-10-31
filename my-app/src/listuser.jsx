import React, { useState, useEffect } from "react";
import "./listUser.css";
import axios from "axios";

const ListUser = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/teachers')
            .then(response => setTeachers(response.data))
            .catch(error => console.error("Có lỗi xảy ra khi lấy dữ liệu!", error));
    }, []);

    return (
        <div className="table-container">
            <table className="teacher-table">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Giáo viên</th>
                        <th>Trình độ</th>
                        <th>Bộ môn</th>
                        <th>TT Công tác</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher.code}>
                            <td>{teacher.code}</td>
                            <td>
                                <div className="teacher-info">
                                    <img src="teacher-avatar.png" alt="avatar" className="avatar" />
                                    <div>
                                        <div>{teacher.name || 'N/A'}</div>
                                        <div>{teacher.email || 'N/A'}</div>
                                        <div>{teacher.phoneNumber || 'N/A'}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {teacher.degrees && teacher.degrees.length > 0 ? (
                                    teacher.degrees.map(degree => (
                                        <div key={degree._id}>
                                            <div>{degree.type}</div>
                                            <div>Chuyên ngành: {degree.major}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div>N/A</div>
                                )}
                            </td>
                            <td>
                                {teacher.teacherPositions && teacher.teacherPositions.length > 0 ? (
                                    teacher.teacherPositions.map(position => (
                                        <div key={position._id}>
                                            <div>{position.name}</div>
                                            <div>Mô tả: {position.des || 'N/A'}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div>N/A</div>
                                )}
                            </td>
                            <td>{teacher.userId?.address || 'N/A'}</td>
                            <td>
                                <span className={`status ${teacher.isActive ? "active" : "inactive"}`}>
                                    {teacher.isActive ? "Đang công tác" : "Không hoạt động"}
                                </span>
                            </td>
                            <td><button className="details-button">Chi tiết</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListUser;
