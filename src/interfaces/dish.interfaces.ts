interface IUser {
  id: string; // Primary key
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string; // unique
  password: string | null; // Users who use alternative authorization will have no password
  picture: string | null; // url
  description: string | null;
  phoneNumber: string | null;
  createdAt: Date;
}

// For authorization via google / facebook / github / etc...
interface IExAPIUser {
  userId: string; // Primary key
  apiId: string; // Primary key
  createdAt: Date;
}

interface IIngridient {
  id: string; // Primary key
  name: string;
  description: string | null;
  picture: string | null; // url
  calories_per_1g: number; // calories per 1 gram of ingridient
  created_at: Date;
  created_by: String;
}

interface IDish {
  id: string; // Primary key
  name: string;
  description: string | null;
  picture: string | null;
  calories: number; // sum of ingridients caloeries in "IIngridientsDishes"
  createdAt: Date;
}

// Relational table for ingridients - dishes
interface IIngridientsDishes {
  ingridientId: string; // Primary key
  dishId: string; // Primary key
  weight: number; // weight of ingridient (grams)
  calories: number; // weight * caloriesPer1g
}

interface IWishlist {
  userId: string; // id of the user who wishes
  dishId: string; // id of the dish which is wished
  createdAt: Date;
}

interface IBlackList {
  userId: string; // id of the user who blacklists
  dishId: string; // id of the dish which is blacklisted
  createdAt: Date;
}

interface IFeedbacks {
  userId: string; // id of user who left the comment
  dishId: string; // id of the dish which is commented
  message: string;
  deletedAt: string | null;
  updatedAt: string | null;
  createdAt: string;
}

// inteface for feedbacks of users about missing dishes with provided ingridients to admins
interface IDishMissingFeedbacks {
  ingridients: IIngridient[];
  userId: string;
  message: string;
  createdAt: Date;
}
