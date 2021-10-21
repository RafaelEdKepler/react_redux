import { AxiosResponse } from 'axios';
import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { IState } from '../..';
import api from '../../../services/api';
import { addProductToCartFailure, addProductToCartSuccess } from './actions';
import { ActionTypes } from './types';

interface IStockResponse {
    id: number;
    quantity: number;
}

function* checkProductStock(action: any) {
    //@ts-ignore
    const { product } = action.payload;

    const currentQuantity: number = yield select((state) : IState => {
        //@ts-ignore
        return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0
    })

    const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

    if (availableStockResponse.data.quantity > currentQuantity) {
        yield put(addProductToCartSuccess(product));
    } else {
        yield put(addProductToCartFailure(product.id));
    }

    console.log(currentQuantity);
}

// takeLatest -> caso a Action seja chamada mais de uma vez, se a função não
// tiver terminado ainda, o Redux cancelará a função que está executando e fará
// uma nova para essa nova chamada
// takeEvery -> Manteria todas as funções executando e esperaria todas terminar
// takeLeading -> Pegaria apenas a primeira
// takeLatest(Action a ser interceptada, função a ser executada)
export default all([
    takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
])