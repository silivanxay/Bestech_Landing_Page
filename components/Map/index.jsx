import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Res_Map() {
    const defaultProps = {
        center: {
            lat: 17.9243108,
            lng: 102.6523382
        },
        zoom: 20
    };

    return (
        <div className="w-full flex justify-center">
            <div className="lg:w-[80%] w-[90%] pb-[10%]">
                <p className="text-[33px] text-black dark:text-white text-center font-bold py-[5%]">ສະຖານທີ່ຕັ້ງ ບໍລິສັດ</p>
                <div className="w-[100%] lg:h-[100vh] h-[50vh]">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        <AnyReactComponent
                            lat={17.9243108}
                            lng={102.6523382}
                        />
                    </GoogleMapReact>
                </div>
            </div>
        </div>
    );
}
