import Caller from '../Connection/caller';
import localhost from '../utils/env';

export default class Api {
  static async LoginApi(email, password, userType) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    const body = {
      email: email,
      password: password,
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      urlPath: localhost + '/' + userType + '/login',
    };

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async SignupApi(
    user_name,
    email,
    sp,
    phone,
    password,
    confirm_password,
    userType,
  ) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    if (sp !== false) {
      var body = {
        user_name: user_name,
        email: email,
        phone: phone,
        specialist: sp,
        password: password,
        confirm_password: confirm_password,
      };
    } else {
      var body = {
        user_name: user_name,
        email: email,
        phone: phone,
        password: password,
        confirm_password: confirm_password,
      };
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      urlPath: localhost + '/' + userType + '/signup',
    };

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async sendEmail(email, user_type) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    const body = {
      email: email,
      user_type: user_type,
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      urlPath: localhost + '/forgetpassword/send/email',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async checkCode(email, user_type, code) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    const body = {
      email: email,
      user_type: user_type,
      code: code,
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      urlPath: localhost + '/forgetpassword/checkcode',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async resetPassword(email, user_type, password, confirm_password) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    const body = {
      email: email,
      user_type: user_type,
      password: password,
      confirm_password: confirm_password,
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      urlPath: localhost + '/forgetpassword/resetpassword',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async UserLocation(email, location) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    const body = {
      email: email,
      location: location,
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      urlPath: localhost + '/user/location',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async MehanicLocation(email, location) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    const body = {
      email: email,
      location: location,
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      urlPath: localhost + '/location/mechanic',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async GetApprovedMechanics() {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      urlPath: localhost + '/mechanic/getapproved',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async HireSpecialist(data) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    const body = {
      user_code: data.user_code,
      user_phone: data.user_phone,
      user_location: data.user_location,
      mechanic_code: data.mechanic_code,
      mechanic_phone: data.mechanic_phone,
      order_name: data.order_name,
      order_date: data.order_date,
      order_time: data.order_time,
      order_status: 'pending',
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      urlPath: localhost + '/hireme',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async GetAppointments(data) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    const body = {
      user_code: data.code,
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      urlPath: localhost + '/getorderbyid',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async GetAppointmentsM(data) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    const body = {
      user_code: data.code,
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      urlPath: localhost + '/getorderbyid/m',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async GetMechanicById(code) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    const body = {
      code: code,
    };

    console.log(body, '   <-------------------');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      urlPath: localhost + '/mechanic/getmechanicbyid',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log('response ->', response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async GetAllShops() {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      urlPath: localhost + '/shop/getallshops',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log('response ->', response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async makeCharges(code, amount, status) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      code: code,
      order_amount: amount,
      order_status: status,
    });

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      urlPath: localhost + '/makeCharges',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log('response ->', response);
        return response;
      })
      .catch(error => console.log('error', error));
  }

  static async makePayment(code, status) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      code: code,
      order_status: status,
    });

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      urlPath: localhost + '/makeCharges',
    };

    console.log('requestOptions => ', requestOptions);

    return Caller.callServer(requestOptions)
      .then(response => {
        console.log('response ->', response);
        return response;
      })
      .catch(error => console.log('error', error));
  }
}
