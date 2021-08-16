import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import * as style from './style.css';
import { SearchInput } from '../../components/SearchInput';
import fetch from 'node-fetch';
import { User } from '../../models';
import { UserSearchPageState } from '../../stores/state';

export const UserSearchPage: React.FC = (): JSX.Element | null => {
  const reposUrl: string = 'https://api.github.com/users/defunkt/repos';
  const [pageState, setPageState] = React.useState<UserSearchPageState>(UserSearchPageState.DEFAULT);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [rawUsers, setRawUsers] = React.useState<[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<User.Model[]>([]);

  const handleKeyChange = (value: string) => {
    console.log('inside handleKeyChange()');

    if (value === '') {
      setPageState(UserSearchPageState.DEFAULT);
    } else {
      setPageState(UserSearchPageState.READ_USERS);
    }

    setInputValue(value);
  };

  React.useEffect(() => {
    console.log('inside useEffect()');
    console.log('inputValue: ', inputValue);
    console.log('rawUsers: ', rawUsers);

    let tempUsers: User.Model[] = [];
    
    if (rawUsers.length > 0) {
      rawUsers.map((user: { [x: string]: any; }) => {
        if (String(user["name"]).startsWith(inputValue)) {
          let newUser: User.Model = {
            id: user["id"],
            name: user["name"]
          };

          tempUsers.push(newUser);
        }
      });
    } else {
      fetch(reposUrl)
      .then(res => res.json())
      .then(result => setRawUsers(result));
    }

    setFilteredUsers(tempUsers);
  }, [inputValue]);

  console.log('pageState: ', pageState);

  if (pageState === UserSearchPageState.READ_USERS)
  {
    console.log('pageState = READ_USERS');
    console.log('filteredUsers: ', filteredUsers);

    return (
      <React.Fragment>
        <SearchInput
          handleKeyChange={handleKeyChange}
          placeHolder='Search users'
          value={inputValue} />
          {/* <div>
            <span>FILTERED USERS COUNT: </span>
            <span>{filteredUsers.length}</span>
          </div> */}
          <div>
            {filteredUsers.map((user, index) => (
              <div key={index}>{user.name}</div>
            ))}
          </div>
      </React.Fragment>
    );
  }

  // DEFAULT
  return (
    <React.Fragment>
      <SearchInput
        handleKeyChange={handleKeyChange}
        placeHolder='Search users'
        value={inputValue} />
    </React.Fragment>
  );
}

const element = <UserSearchPage></UserSearchPage>
ReactDOM.render(element, document.getElementById('root'));