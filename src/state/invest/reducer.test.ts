import { createStore, Store } from 'redux';
import { Field, selectCurrency } from './actions';
import reducer, { InvestState } from './reducer';

describe('invest reducer', () => {
  let store: Store<InvestState>;

  beforeEach(() => {
    // @ts-ignore // todo: Fix this test
    store = createStore(reducer, {
      [Field.OUTPUT]: { currencyId: '' },
      [Field.INPUT]: { currencyId: '' },
      typedValue: '',
      independentField: Field.INPUT,
      recipient: null,
    });
  });

  describe('selectToken', () => {
    it('changes token', () => {
      store.dispatch(
        selectCurrency({
          field: Field.OUTPUT,
          currencyId: '0x0000',
        }),
      );

      expect(store.getState()).toEqual({
        [Field.OUTPUT]: { currencyId: '0x0000' },
        [Field.INPUT]: { currencyId: '' },
        typedValue: '',
        independentField: Field.INPUT,
        recipient: null,
      });
    });
  });
});
