import MBTA from 'mbta-client';

export default ({ app }, inject) => {
    app.mbta = new MBTA("5d6aef60fc6a4107a8075a2df81da885");
}