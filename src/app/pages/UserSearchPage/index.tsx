import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.css';
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
  const resultSize: number = 4;

  const handleKeyChange = (value: string) => {
    if (value === '') {
      setPageState(UserSearchPageState.DEFAULT);
    } else {
      setPageState(UserSearchPageState.READ_USERS);
    }

    setInputValue(value);
  };

  React.useEffect(() => {
    console.log('inputValue: ', inputValue);
    console.log('rawUsers: ', rawUsers);

    let tempUsers: User.Model[] = [];
    
    if (rawUsers.length > 0) {
      rawUsers.map((user: { [x: string]: any; }) => {
        if (String(user["name"]).startsWith(inputValue)) {
          console.log('user: ', user);

          let newUser: User.Model = {
            id: user["id"],
            name: user["name"],
            owner: {
              ownerId: user["owner"]["id"],
              avatarUrl: user["owner"]["avatar_url"]
            }
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

  if (pageState === UserSearchPageState.READ_USERS)
  {
    return (
      <React.Fragment>
        <div id='container'>
          <SearchInput
            handleKeyChange={handleKeyChange}
            placeHolder='Search users'
            value={inputValue}
          />
          <div id='users-list'>
            {filteredUsers.slice(0, resultSize).map((user, index) => (
              <div key={index}>
                {/* <img alt='logo' src='https://picsum.photos/50/25' style={{ marginRight: '1vw' }}/> */}
                <img alt='logo' src={user.owner.avatarUrl} className={'img'}/>
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }

  // Default page state
  return (
    <React.Fragment>
      <div id='container'>
        <SearchInput
          handleKeyChange={handleKeyChange}
          placeHolder='Search users...'
          value={inputValue} />
      </div>
    </React.Fragment>
  );
}

const element = <UserSearchPage></UserSearchPage>
ReactDOM.render(element, document.getElementById('root'));