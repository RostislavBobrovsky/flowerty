package by.itechart.flowerty.dao;

import by.itechart.flowerty.domain.User;

/**
 * Created with IntelliJ IDEA.
 * User: Мария
 * Date: 20.03.15
 * Time: 7:25
 * To change this template use File | Settings | File Templates.
 */
public interface UserDao {
    public void saveUser (User user);
    public boolean checkUser (String login, String password);
    public User getUser(Integer id);
}
