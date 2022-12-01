export const onlyNumber = /^[0-9]*$/;

export const userTemplateData = {
  id: "123",
  name: "Test First Name",
  lastName: "Test Last Name",
  phoneNumber: "905000000000",
  email: "test@gmail.com",
  gender: 0,
  role: 0,
  birthDate: "10/10/2000",
};

export const measurementTemplateData = {
  id: "m_1",
  weight: 80,
  height: 170,
  waist: 70,
  back: 100,
  create_date: "27/11/2022 11:45:00",
  user_id: "123",
};

export const workoutsTemplateData = {
  id: "w_1",
  trainer_id: "123",
  student_id: "321",
  expertise: 1,
  workout_date: "27/11/2022 11:30:00",
};

export const feedbackTemplateData = {
  id: "f_1",
  feedback: "He is doing great.",
  create_date: "27/11/2022 11:45:00",
  workout_id: "123",
};

export const trainlerTemplateData = {
  id: "t_1",
  work_day: [1, 4],
  expertise: 1,
  user_id: "321",
};
