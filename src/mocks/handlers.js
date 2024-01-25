import { http, HttpResponse } from 'msw';

const baseURL = 'http://localhost:8000';

export const handlers = [
  http.get(`${baseURL}/dj-rest-auth/user/`, () => {
    console.log('user endpoint hit');
    return HttpResponse.json({
      pk: 5,
      username: 'testuser1changed',
      email: '',
      first_name: '',
      last_name: '',
      profile_id: 5,
      profile_image:
        'https://res.cloudinary.com/dzvumadj4/image/upload/v1/media/images/jap_r2pmta',
    });
  }),
  http.post(`${baseURL}/dj-rest-auth/logout/`, null),
];
