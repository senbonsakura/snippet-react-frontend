const snippetsReducerDefaultState = {snippets: [], isLoading: true, options: []};

export default (state = snippetsReducerDefaultState, action = {}) => {
  switch (action.type) {
    case 'REQUEST_SET_SNIPPET':
      return {
        ...state,
        isLoading: true
      };
    case 'REQUEST_EDIT_SNIPPET':
      return {
        ...state,
        isLoading: true
      };
    case 'REQUEST_ADD_SNIPPET':
      return {
        ...state,
        isLoading: true
      };
    case 'SUCCESS_SET_SNIPPET':
      return {
        ...state,
        snippets: action.payload.results,
        isLoading: false
      };
    case 'SUCCESS_ADD_SNIPPET':
      return {...state,
        snippets: [...state.snippets, action.payload],
        isLoading: false
      };
    case 'SUCCESS_GET_OPTIONS':
      return {
        ...state,
        options: {
          language: action.payload.actions.POST.language.choices.map((item) => {
            return {
              value: item.value,
              label: item.display_name
            };
          }),
          style: action.payload.actions.POST.style.choices.map((item) => {
            return {
              value: item.value,
              label: item.display_name
            };
          })
        }
      };


    case 'SUCCESS_DELETE_SNIPPET':
      const snippets = state.snippets.filter(({id}) => id !== action.payload.id);

      return {
        snippets,
        isLoading: false,
      };

    case 'SUCCESS_EDIT_SNIPPET':
      return {
        snippets: state.snippets.map((snippet) => {
          if (snippet.id === action.payload.id) {
            return {
              ...snippet,
              ...action.payload.updates
            };
          } else return snippet  ;

        }),
        isLoading: false
      };
    default:
      return state;
  }
}

export const getSnippets = (state) => state.snippets;
