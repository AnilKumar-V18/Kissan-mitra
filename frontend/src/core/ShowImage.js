import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
    <div className="vegetable-img">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="myImg"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
);

export default ShowImage;
