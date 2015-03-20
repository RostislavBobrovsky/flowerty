package by.itechart.flowerty.domain;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "contact")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME", length = 20, nullable = true)
    private String name;

    @Column(name = "SURNAME", length = 20, nullable = true)
    private String surname;
    @Column(name = "FATHERNAME", length = 20, nullable = true)
    private String fathername;

    @Column(name = "BIRTHDAY", nullable = true)
    @Temporal(value = TemporalType.DATE)
    private Date birthday;

    @Column(name = "email", length = 50, nullable = true)
    private String email;

    @ManyToOne
    @JoinColumn(name = "ADDRESS_ID")
    private Address address;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    @OneToOne
    @PrimaryKeyJoinColumn(name = "user")
    private User user;

    public Contact() {
    }

    public Contact(Long id, String name, String surname, String fathername, Date birthday, String email, Address address, User user) {
	super();
	this.id = id;
	this.name = name;
	this.surname = surname;
	this.fathername = fathername;
	this.birthday = birthday;
	this.email = email;
	this.address = address;
        this.user = user;
    }

    public Long getId() {
	return id;
    }

    public void setId(Long id) {
	this.id = id;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getSurname() {
	return surname;
    }

    public void setSurname(String surname) {
	this.surname = surname;
    }

    public String getFathername() {
	return fathername;
    }

    public void setFathername(String fathername) {
	this.fathername = fathername;
    }

    public Date getBirthday() {
	return birthday;
    }

    public void setBirthday(Date birthday) {
	this.birthday = birthday;
    }

    public String getEmail() {
	return email;
    }

    public void setEmail(String email) {
	this.email = email;
    }

    public Address getAddress() {
	return address;
    }

    public void setAddress(Address address) {
	this.address = address;
    }
}
