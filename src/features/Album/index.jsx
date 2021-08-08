import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Covid',
            thumnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/5/d/a/7/5da7f2c1b6b33ed1c1ad7a4010947d42.jpg'
        },
        {
            id: 2,
            name: 'Mr Siro',
            thumnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/5/d/a/7/5da7f2c1b6b33ed1c1ad7a4010947d42.jpg'
        },
        {
            id: 3,
            name: 'ZingChart',
            thumnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/9/7/c/9/97c960ac271e94fa47c87a12aa7d3be5.jpg'
        },
    ];

    return (
        <div>
            <h2>Album</h2>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;