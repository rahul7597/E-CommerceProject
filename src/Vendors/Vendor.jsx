import React from 'react';
import { Link } from 'react-router-dom';
import './Vendor.css'

function Vendor() {
return (
<div className="app">
<div className="header">
<h1>Wedding Services</h1>
</div>
<div className="services">
<div className="service-card">
<Link to="/wedding-photographers">
<h2>Wedding Photographers</h2>
</Link>
</div>
<div className="service-card">
<Link to="/wedding-decorators">
<h2>Wedding Decorators</h2>
</Link>
</div>
<div className="service-card">
<Link to="/wedding-venues">
<h2>Wedding Venues</h2>
</Link>
</div>
<div className="service-card">
<Link to="/choreographers">
<h2>Choreographers</h2>
</Link>
</div>
<div className="service-card">
<Link to="/wedding-wear">
<h2>Wedding Wear</h2>
</Link>
</div>
<div className="service-card">
<Link to="/wedding-entertainment">
<h2>Wedding Entertainment</h2>
</Link>
</div>
<div className="service-card">
<Link to="/djs">
<h2>DJs</h2>
</Link>
</div>
<div className="service-card">
<Link to="/wedding-pandits">
<h2>Wedding Pandits</h2>
</Link>
</div>
<div className="service-card">
<Link to="/wedding-car">
<h2>Wedding Car</h2>
</Link>
</div>
<div className="service-card">
<Link to="/bridal-makeup-artists">
<h2>Bridal Makeup Artists</h2>
</Link>
</div>
<div className="service-card">
<Link to="/wedding-planners">
<h2>Wedding Planners</h2>
</Link>
</div>
<div className="service-card">
<Link to="/mehndi-artists">
<h2>Mehndi Artists</h2>
</Link>
</div>
<div className="service-card">
<Link to="/wedding-invitations">
<h2>Wedding Invitations</h2>
</Link>
</div>
<div className="service-card">
<Link to="/wedding-videographers">
<h2>Wedding Videographers</h2>
</Link>
</div>
<div className="service-card">
<Link to="/wedding-caterers">
<h2>Wedding Caterers</h2>
</Link>
</div>
<div className="service-card">
<Link to="/wedding-jewellery">
<h2>Wedding Jewellery</h2>
</Link>
</div>
<div className="service-card">
<Link to="/honeymoon">
<h2>Honeymoon</h2>
</Link>
</div>
<div className="service-card">
<Link to="/wedding-gifts">
<h2>Wedding Gifts</h2>
</Link>
</div>
</div>
</div>
);
}

export default Vendor;

