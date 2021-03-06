/**
 * PerfRepo
 * <p>
 * Copyright (C) 2015 the original author or authors.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
package org.perfrepo.model.auth;

import org.perfrepo.model.Entity;
import org.perfrepo.model.report.Report;
import org.perfrepo.model.user.User;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@javax.persistence.Entity
@Table(name = "permission")
@XmlRootElement(name = "report-permission")
public class Permission implements Entity<Permission>, Comparable<Permission> {

   private static final long serialVersionUID = 5637370080321126750L;

   @Id
   @SequenceGenerator(name = "PERMISSION_ID_GENERATOR", sequenceName = "PERMISSION_SEQUENCE", allocationSize = 1)
   @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PERMISSION_ID_GENERATOR")
   private Long id;

   @Column(name = "access_type")
   @Enumerated(EnumType.STRING)
   private AccessType accessType;

   @Column(name = "access_level")
   @Enumerated(EnumType.STRING)
   private AccessLevel level;

   @Column(name = "group_id")
   private Long groupId;

   @Column(name = "user_id")
   private Long userId;

   @Transient
   private Long reportId; //used for REST API

   @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
   @JoinColumn(name = "report_id", referencedColumnName = "id")
   private Report report;

   @XmlElement(name = "access-type")
   public AccessType getAccessType() {
      return accessType;
   }

   public void setAccessType(AccessType permission) {
      this.accessType = permission;
   }

   @XmlElement(name = "access-level")
   public AccessLevel getLevel() {
      return level;
   }

   public void setLevel(AccessLevel level) {
      this.level = level;
   }

   public void setId(Long id) {
      this.id = id;
   }

   @Override
   public Long getId() {
      return id;
   }

   @XmlElement(name = "group-id")
   public Long getGroupId() {
      return groupId;
   }

   public void setGroupId(Long groupId) {
      this.groupId = groupId;
   }

   @XmlElement(name = "user-id")
   public Long getUserId() {
      return userId;
   }

   public void setUserId(Long userId) {
      this.userId = userId;
   }

   @XmlTransient
   public Report getReport() {
      return report;
   }

   public void setReport(Report report) {
      this.report = report;
   }

   public void setUser(User user) {
      this.userId = user.getId();
   }

   @XmlElement(name = "report-id")
   public Long getReportId() {
      return reportId;
   }

   public void setReportId(Long reportId) {
      this.reportId = reportId;
   }

   @Override
   public int compareTo(Permission o) {
      // TODO Auto-generated method stub
      return 0;
   }

   @Override
   public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;

      Permission that = (Permission) o;

      if (accessType != that.accessType) return false;
      if (level != that.level) return false;
      if (groupId != null ? !groupId.equals(that.groupId) : that.groupId != null) return false;
      return userId != null ? userId.equals(that.userId) : that.userId == null;

   }

   @Override
   public int hashCode() {
      int result = accessType != null ? accessType.hashCode() : 0;
      result = 31 * result + (level != null ? level.hashCode() : 0);
      result = 31 * result + (groupId != null ? groupId.hashCode() : 0);
      result = 31 * result + (userId != null ? userId.hashCode() : 0);
      return result;
   }

   @Override
   public Permission clone() {
      try {
         return (Permission) super.clone();
      } catch (CloneNotSupportedException e) {
         throw new RuntimeException(e);
      }
   }
}
