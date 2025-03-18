package com.example.state_carpool.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.state_carpool.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findUserById(Long id);
	
	@Query(nativeQuery = true, value = "Select * from G2USER u where u.email = :email and u.password = :password")
	User loginUser(@Param("email") String email, @Param("password") String password);
	
	@Query(nativeQuery=true, value = "SELECT * FROM G2USER gu WHERE CHAR(ROLES) LIKE '%ROLE_RIDER%'")
	List<User> fetchAllRiders();
	
	@Query(nativeQuery=true, value = "SELECT * FROM G2USER gu WHERE CHAR(ROLES) LIKE '%ROLE_ADMIN%'")
	List<User> fetchAllAdmins();
	
	@Query(nativeQuery=true, value = "SELECT * FROM G2USER gu WHERE CHAR(ROLES) LIKE '%ROLE_DRIVER%'")
	List<User> fetchAllDrivers();
	
	@Query(nativeQuery = true, value = "SELECT * FROM G2USER gu\r\n"
			+ "LEFT JOIN (\r\n"
			+ "	SELECT DISTINCT gr.driver_id FROM G2RIDE gr\r\n"
			+ "	JOIN G2ROUTE ru ON gr.route_id = ru.id\r\n"
			+ "	WHERE gr.\"DATE\" = :date AND ru.route_type = :routeType\r\n"
			+ ") drivers ON gu.id = drivers.driver_id WHERE CHAR(ROLES) LIKE '%ROLE_DRIVER%' AND drivers.driver_id IS NULL ")
	List<User> fetchAvailableDrivers(@Param("date") String date, @Param("routeType") String routeType);

}
