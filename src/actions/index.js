/**
 * Action Increment
 *
 * @param step : cộng bao nhiêu đơn vị
 * @returns {{payload: number, type: string}}
 */
export const increment = (step = 1) => {
    return {
        type: 'INCREMENT',
        payload: step
    };
};

/**
 * Action Decrement
 *
 * @param step trừ bao nhiêu đơn vị
 * @returns {{payload: *, type: string}}
 */
export const decrement = (step) => {
    return {
        type : 'DECREMENT',
        payload: step
    };
};