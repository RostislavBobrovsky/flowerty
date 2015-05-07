package by.itechart.flowerty.security;

import by.itechart.flowerty.configuration.*;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.Filter;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by Rostislav on 05-May-15
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {
        WebMvcConfiguration.class,
        ApplicationConfiguration.class,
        JpaConfiguration.class,
        SearchContext.class,
        SpringSecurityConfiguration.class})
@WebAppConfiguration
public class SecurityRequestsTests {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private Filter springSecurityFilterChain;

    @Autowired
    private UserDetailsService userDetailsService;

    private MockMvc mvc;

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .addFilters(springSecurityFilterChain)
                .build();
    }

    @Test
    public void requestProtectedUrlWithUser() throws Exception {
        mvc
                .perform(get("/").with(user("user")))
                .andExpect(status().isOk())
                .andExpect(authenticated().withUsername("user"))
        ;
    }

    @Test
    public void requestProtectedUrlWithAdmin() throws Exception {
        mvc
                .perform(get("/admin").with(user("admin").password("pass").roles("USER", "ADMIN")))
                .andExpect(status().isOk())
                .andExpect(authenticated().withUsername("admin"));
    }

    @Ignore
    @Test
    public void requestProtectedUrlWithUserDetails() throws Exception {
        UserDetails userDetails = userDetailsService.loadUserByUsername("user");
        mvc
                .perform(get("/").with(user(userDetails)))
                .andExpect(status().isOk())
                .andExpect(authenticated().withAuthenticationPrincipal(userDetails))
        ;
    }

    @Test
    public void requestProtectedUrlWithAuthentication() throws Exception {
        Authentication authentication = new TestingAuthenticationToken("test", "notused", "ROLE_USER");
        mvc
                .perform(get("/").with(authentication(authentication)))
                .andExpect(status().isOk())
                .andExpect(authenticated().withAuthentication(authentication))
        ;
    }
}