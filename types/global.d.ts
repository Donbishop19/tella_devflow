interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface Question {
  _id: string;
  title: string;
  tags: Tag[];
  author: Author;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}

type SuccessResponse<T = null> = {
  success: true;
  data: T;
  status?: number;
};

type ErrorResponse = {
  success: false;
  error: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type ActionResponse<T = null> = SuccessResponse<T> | ErrorResponse;

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;