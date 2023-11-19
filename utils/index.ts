import { StatusCodes } from "http-status-codes";
import { LeanDocument, Document } from "mongoose";

interface IResult<D, E> {
  error: E;
  code: StatusCodes;
  message: string;
  data: D;
}

type Success<D> = IResult<D, null>;
type Error<E> = IResult<null, E>;
type Result<D, E> = Success<D> | Error<E>;

const lean = <D extends Document>(document: D): LeanDocument<D> =>
  document?.toObject() || null;

const respond = <D, E>(
  code: StatusCodes,
  message: string,
  error: E,
  data: any = null
) => ({
  error: error,
  code: code,
  message: message,
  data: data,
});

const failure = <E>(code: StatusCodes, message: string, error: E): Error<E> =>
  respond(code, message, error);

const success = <D>(
  message: string,
  data: D,
  code: StatusCodes = StatusCodes.OK
): Success<D> => respond(code, message, null, data);

const isError = <D, E>(result: Result<D, E>): result is Error<E> =>
  !!result.error;

const paginate = <T>({
  data,
  page,
  limit,
  countTotal,
  code = StatusCodes.OK,
  message,
  error,
}: {
  data: T;
  page: number;
  limit: number;
  countTotal: number;
  message: string;
  code: number;
  error: null;
}) => {
  return {
    code,
    message,
    error,
    data,
    currentPage: +page,
    totalPages: Math.ceil(countTotal / limit),
    countTotal,
  };
};

export {
  IResult,
  Result,
  Error,
  Success,
  failure,
  isError,
  success,
  paginate,
  lean,
};
