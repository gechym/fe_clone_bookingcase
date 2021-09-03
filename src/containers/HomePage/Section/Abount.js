import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Abount.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class abount extends Component {

    render() {
        return (
            <div className="section-share section-abount">
                <div className="section-abount-header">
                    <h2>Truyền thông nói về chúng tôi</h2>
                </div>
                <div className="section-abount-content">
                    <div className="content-right">
                        <iframe 
                            width="100%" height="400px" 
                            src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className="content-left">
                        <p>
                            <b>Nội dung khóa học ?</b>
                        <br/>
                        <i>
                            <b>✔</b> Các bạn có thể làm chủ công nghệ, cũng như học được, biết được những kiến thức thực tế
                            dùng tại các công ty hiện nay. Sau khi kết thúc khóa học này, mình tin chắc rằng dự án này 
                            đủ lớn, đủ thực tế để cho các bạn mới ra trường viết vào CV xin việc của mình ^^
                            <br/>
                            <b>✔</b> Các bạn hiểu được 1 FullStack Web Developer thì cần chuẩn bị những gì. Ở đây, mình không dám chắc 100% các bạn sẽ trở thành Fullstack Developer, nhưng nếu bạn chọn Frontend hay Backend thì khóa học này cũng cung cấp cho bạn nhiều điều bổ ích
                            Mình dự định sẽ làm 1 website với nội dung hỗ trợ việc đặt lịch khám bệnh bác sĩ, tương tự như website: https://bookingcare.vn/ . Trong khóa học này, mình sẽ clone (sao chép) lại giao diện Frontend và tự làm hoàn toàn phần Backend cũng như cơ sở dữ liệu của dự án.
                        </i>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(abount
);
