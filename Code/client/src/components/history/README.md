# DBMS-Assignment4
## From ER Design to Implementation - Paper Review Database

### **Project Description:**

The main goal of this project is to create database schema for Paper Reviews database.
Used SQL queries for creating and populating the schema.

The SQL files present in the repository consists of the following statements:

1. Create statements for creating schema and tables,  
2. Insert statements for populating tables.

### **Scripts Description:**

**paper_reviewer_author.sql:** This SQL script contains DDL statements for creating schema 'paper_reviewer' and table 'Author'. It also contains the DML Insert statements for populating this table.

**paper_reviewer_paper.sql:** This SQL script contains DDL statements for creating schema 'paper_reviewer' if not exists and table 'Paper'. It also contains the DML Insert statements for populating this table.

**paper_reviewer_reviewer.sql:** This SQL script contains DDL statements for creating schema 'paper_reviewer' if not exists and table 'Reviewer'. It also contains the DML Insert statements for populating this table.

**paper_reviewer_assign.sql:** This SQL script contains DDL statements for creating schema 'paper_reviewer' if not exists and table 'Assign'. It also contains the DML Insert statements for populating this table.

**paper_reviewer_review.sql:** This SQL script contains DDL statements for creating schema 'paper_reviewer' if not exists and table 'Review'. It also contains the DML Insert statements for populating this table.

**paper_reviewer_topic.sql:** This SQL script contains DDL statements for creating schema 'paper_reviewer' if not exists and table 'Topic'. It also contains the DML Insert statements for populating this table.

### **Execution instructions:**

**Pre-requistes:**  In the command line, please go to the path where MYSQL Server/bin is installed and execute the following steps:

Step 1: *mysql -u \<username\> -p < paper_reviewer_author.sql*

Step 2: *mysql -u \<username\> -p < paper_reviewer_paper.sql*

Step 3: *mysql -u \<username\> -p < paper_reviewer_reviewer.sql*

Step 4: *mysql -u \<username\> -p < paper_reviewer_assign.sql*

Step 5: *mysql -u \<username\> -p < paper_reviewer_review.sql*

Step 6: *mysql -u \<username\> -p < paper_reviewer_topic.sql*
                                                           
**Please Note:**
1. \<username\> : Please enter mysql username. 
2. After everystep, mysql would prompt for password. Please enter the same.

